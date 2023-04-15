import { pipe } from 'fp-ts/lib/function';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { fetchData } from '../../fetch';
import { combineApiUrl, getContentPath, isNotContentDynamicRouteYet } from '../../functions';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { toLowerCase } from 'fp-ts/lib/string';

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

export function useCreateContent(asPath: string) {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const url = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : combineApiUrl(asPath)),
    [isNotContentDynamicRouteYet, combineApiUrl, asPath],
  );

  const getFieldsUrl = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : pipe(asPath, getContentPath, combineApiUrl, addGetFields)),
    [isNotContentDynamicRouteYet, pipe, asPath, getContentPath, combineApiUrl, addGetFields],
  );

  const { data } = useSWR<ConfigDataType>(url, fetchData);
  const { data: getFieldsData } = useSWR(getFieldsUrl, fetchData);

  const fieldsData = useMemo(
    () => (isFieldsApiData(getFieldsData) ? pipe(getFieldsData, mapNameToComponent, formatSelectData) : undefined),
    [isFieldsApiData, getFieldsData, mapNameToComponent, pipe, formatSelectData],
  );

  return {
    data,
    fieldsData,
    isSubmitButtonDisabled,
    setIsSubmitButtonDisabled,
  };
}
