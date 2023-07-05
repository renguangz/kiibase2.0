import { ApiDataType } from '@/src/types/data';
import { pipe } from 'fp-ts/lib/function';
import { useMemo } from 'react';
import useSWR from 'swr';
import { isNotContentDynamicRouteYet } from '../../functions';

export type ConfigListType = {
  title: string;
  type: string;
  name?: string;
  sort_field?: string;
  options?: Array<Record<'key' | 'value', string>>;
};

export type ConfigDataFieldType = {
  type: 'ImageUploadComponent' | 'SingleSelectComponent' | 'Input';
  label: string;
  model: string;
  required: boolean;
  readonly: boolean;
  hint: string;
  default?: string | number | null;
  options: Array<{ id: string; name: string }>;
  inputType?: 'number';
};

export type ConfigDataType = {
  create_button: boolean;
  delete_button: boolean;
  list: ConfigListType[];
  date_filter: boolean;
  date_filter_column: boolean;
  topic: string;
  field: ConfigDataFieldType[];
  is_single_data?: boolean;
  single_data_id?: string | number;
};

type AddGetConfig = (route: string) => string;
const addGetConfig: AddGetConfig = (route) => `/model${route}/getConfig`;

export function useGetConfig(asPath: string) {
  const url = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : pipe(asPath, addGetConfig)),
    [isNotContentDynamicRouteYet, asPath, pipe, addGetConfig],
  );

  const { data: swrData } = useSWR<ApiDataType<ConfigDataType>>(url);

  const apiData = useMemo(() => swrData?.data ?? undefined, [swrData]);

  const columns = useMemo(
    () =>
      apiData?.list
        ?.map((item) => ({
          field: item.name ?? '',
          name: item.type ?? item.sort_field ?? '',
          header: item.title,
          ...(item.options && { options: item.options }),
        }))
        .filter((item) => item),
    [apiData],
  );

  const canUpdateFields = useMemo(() => ['select', 'input'], []);

  const canUpdate = useMemo(
    () => columns?.some((column) => column.name.includes('__component')) ?? false,
    [canUpdateFields, columns],
  );

  return {
    data: apiData,
    columns,
    canUpdate,
  };
}
