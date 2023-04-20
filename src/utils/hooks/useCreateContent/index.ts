import { pipe } from 'fp-ts/lib/function';
import { useCallback, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { fetchData, fetchPostData } from '../../fetch';
import { combineApiUrl, getContentPath, isNotContentDynamicRouteYet } from '../../functions';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { toLowerCase } from 'fp-ts/lib/string';
import { useForm } from 'react-hook-form';

type ConfigDataType = {
  topic: string;
  routes: string;
  canBeCreate: boolean;
  canBeDelete: boolean;
  canBeCopy: boolean;
  listExtend: boolean;
  filter: never[];
  index_join: never[];
  select_column: never[];
  list: { title: string; name: string; sortField: string; dataClass?: string }[];
  listOrder: {
    field: string;
    sortField: string;
    direction: string;
  }[];
  date_filter: boolean;
  date_filter_title?: string;
  date_filter_column: string[];
  search_map: any;
  appends: string[];
  excel: {
    export: boolean;
    title: string[];
    join: any;
    column: string[];
  };
  module: any;
} | null;

type AddGetFields = (route: string) => string;
const addGetFields: AddGetFields = (route) => `${route}/getFields`;

type MappingType = { name: string; component: string };
const mapping: MappingType[] = [
  { name: 'input', component: 'InputTextComponent' },
  { name: 'singleselect', component: 'SingleSelectComponent' },
];

type GetComponentFromMapping = (name: string, mapping: MappingType[]) => string;
const getComponentFromMapping: GetComponentFromMapping = (name, mapping) =>
  pipe(
    mapping,
    A.findFirst((m) => m.name === toLowerCase(name)),
    O.fold(
      () => 'NotFound',
      (m) => m.component,
    ),
  );

type MapNameToComponent = (data: any[]) => any[];
const mapNameToComponent: MapNameToComponent = (data) =>
  pipe(
    data,
    A.map((d) => ({
      ...d,
      type: getComponentFromMapping(d.type, mapping),
      name: d.model,
    })),
  );

type FormatOptions = (options: Array<{ id: string; name: string }>) => Array<{ value: string; label: string }>;
export const formatOptions: FormatOptions = (options) =>
  options.map((option) => ({ value: option.id, label: option.name }));

type FormatSelectData = (data: any[]) => any[];
export const formatSelectData: FormatSelectData = (data) =>
  data.map((item) => (item.options ? { ...item, options: formatOptions(item.options) } : item));

const isFieldsApiData = (data: unknown): data is any[] =>
  !!data && Array.isArray(data) && data.every((item) => 'type' in item);

type ShouldCheckDocumentValue = (field: { type: string }) => boolean;
const shouldCheckDocumentValue: ShouldCheckDocumentValue = (field) =>
  field.type === 'InputTextComponent' || field.type === 'NotFound';

export function useCreateContent(asPath: string) {
  const url = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : combineApiUrl(asPath)),
    [isNotContentDynamicRouteYet, combineApiUrl, asPath],
  );

  const rootUrl = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : pipe(asPath, getContentPath, combineApiUrl)),
    [isNotContentDynamicRouteYet, asPath, pipe, getContentPath, combineApiUrl],
  );

  const getFieldsUrl = useMemo(() => (rootUrl === '' ? '' : addGetFields(rootUrl)), [rootUrl, addGetFields]);

  const { data } = useSWR<ConfigDataType>(url, fetchData);
  const { data: getFieldsData } = useSWR(getFieldsUrl, fetchData);

  const defaultValues = useMemo(() => data?.module?.[0]?.data ?? {}, [data]);
  const form = useForm();

  const fieldsData = useMemo(
    () => (isFieldsApiData(getFieldsData) ? pipe(getFieldsData, mapNameToComponent, formatSelectData) : undefined),
    [isFieldsApiData, getFieldsData, mapNameToComponent, pipe, formatSelectData],
  );

  const requiredFields = useMemo(() => fieldsData?.filter((field) => field.required) ?? [], [fieldsData]);

  const isSubmitButtonDisabled: boolean = useMemo(
    () => {
      return false;
    },
    // () => requiredFields.every((field) => shouldCheckDocumentValue(field)),
    [requiredFields, shouldCheckDocumentValue, form],
  );

  const handleSubmit = useCallback(() => {
    const numberForm = pipe(
      fieldsData,
      O.fromNullable,
      O.getOrElse(() => []),
      A.filter((field: { inputType: string }) => field.inputType === 'number'),
      A.reduce({}, (acc, cur: { name: string }) => ({ ...acc, [cur.name]: parseInt(form.getValues(cur.name ?? 0)) })),
    );

    fetchPostData(rootUrl, {
      ...data,
      module: [
        {
          ...data?.module[0],
          data: {
            ...data?.module[0]?.data,
            ...form.watch(),
            ...numberForm,
          },
        },
      ],
    });
  }, [fetchPostData, form, fieldsData, data]);

  useEffect(() => {
    if (Object.keys(defaultValues).length === 0) return;
    form.reset({ ...defaultValues });
  }, [defaultValues]);

  return {
    form,
    data,
    fieldsData,
    requiredFields,
    isSubmitButtonDisabled,
    handleSubmit,
  };
}
