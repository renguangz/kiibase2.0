import { pipe } from 'fp-ts/lib/function';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatDateForm, formatNumberForm, getContentPath, isNotContentDynamicRouteYet } from '../../functions';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { toLowerCase } from 'fp-ts/lib/string';
import { useForm } from 'react-hook-form';
import { request, requestOptionsTemplate } from '../../request';
import { GenericDataType } from '../../types';
import { useRouter } from 'next/router';
import { ConfigDataFieldType, useGetConfig } from '../useGetConfig';

type RemoveEndingSlash = (route: string) => string;
export const removeEndingSlash: RemoveEndingSlash = (route) =>
  route[route.length - 1] === '/' ? route.substring(0, route.length - 1) : route;

type AddGetFields = (route: string) => string;
export const addGetFields: AddGetFields = (route) => `${route}/getFields`;

type MappingType = { name: string; component: string };
const mapping: MappingType[] = [
  { name: 'input', component: 'InputTextComponent' },
  { name: 'textarea', component: 'TextareaComponent' },
  { name: 'singleselect', component: 'SingleSelectComponent' },
  { name: 'imageupload', component: 'ImageUploadComponent' },
  { name: 'datepicker', component: 'CalendarComponent' },
  { name: 'editor', component: 'EditorComponent' },
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
export const mapNameToComponent: MapNameToComponent = (data) =>
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

export const isFieldsApiData = (data: unknown): data is ConfigDataFieldType[] =>
  !!data && Array.isArray(data) && data.every((item) => 'type' in item);

type ShouldCheckDocumentValue = (field: { type: string }) => boolean;
const shouldCheckDocumentValue: ShouldCheckDocumentValue = (field) =>
  field.type === 'InputTextComponent' || field.type === 'NotFound';

export type ResponseMessageType = { type: 'success' | 'error'; message: string } | null;

export function useCreateContent(asPath: string) {
  const router = useRouter();
  const { push } = router;

  const [createResponseMessage, setCreateResponseMessage] = useState<ResponseMessageType>(null);

  const rootUrl = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : pipe(asPath, getContentPath)),
    [isNotContentDynamicRouteYet, asPath, pipe, getContentPath],
  );

  const { data } = useGetConfig(rootUrl);

  const form = useForm({ mode: 'all' });

  const fieldsData: (ConfigDataFieldType & { name: string })[] | undefined = useMemo(
    () =>
      data && isFieldsApiData(data?.field)
        ? pipe(
            data.field,
            mapNameToComponent,
            formatSelectData,
            A.map((data) => ({ ...data, folder: rootUrl })),
          )
        : undefined,
    [isFieldsApiData, data, pipe, mapNameToComponent, formatSelectData, rootUrl],
  );

  const requiredFields = useMemo(() => fieldsData?.filter((field) => field.required === true), [fieldsData]);

  const requiredImageUploadFields = useMemo(
    () => requiredFields?.filter((field) => field.type === 'ImageUploadComponent') ?? [],
    [requiredFields],
  );

  const requiredImageUploadFieldsAreEmpty = useMemo(
    () => requiredImageUploadFields.some((field) => !form.getValues(field.name)),
    [requiredImageUploadFields, form.watch()],
  );

  const defaultValues = useMemo(
    () => fieldsData?.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.default }), {}) ?? {},
    [fieldsData],
  );

  const isSubmitButtonDisabled: boolean = useMemo(() => {
    return false;
  }, [shouldCheckDocumentValue, form]);

  const handleSubmit = useCallback(async () => {
    const numberForm = formatNumberForm(fieldsData, form.getValues);
    const dateForm = formatDateForm(form.control._formValues);

    const payload = {
      ...form.watch(),
      ...numberForm,
      ...dateForm,
    };

    const result: GenericDataType<null> = await request(`/model${rootUrl}`, requestOptionsTemplate('POST', payload));

    if (result.status === 200) {
      setCreateResponseMessage({ type: 'success', message: '成功' });
      push(rootUrl);
    } else {
      setCreateResponseMessage({ type: 'error', message: result?.message ?? '' });
    }
  }, [request, rootUrl, requestOptionsTemplate, form, data, formatNumberForm, push]);

  useEffect(() => {
    if (Object.keys(defaultValues).length === 0) return;
    form.reset({ ...defaultValues });
  }, [defaultValues]);

  return {
    form,
    data,
    fieldsData,
    listPageUrl: rootUrl,
    requiredFields,
    isSubmitButtonDisabled,
    requiredImageUploadFieldsAreEmpty,
    handleSubmit,
    createResponseMessage,
  };
}
