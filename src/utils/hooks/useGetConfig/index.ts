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
};

export type ConfigDataType = {
  create_button: boolean;
  delete_button: boolean;
  list: ConfigListType[];
  date_filter: boolean;
  date_filter_column: boolean;
  topic: string;
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
      apiData?.list.map((item) => ({
        field: item.name ?? '',
        name: item.type ?? item.sort_field ?? '',
        header: item.title,
      })),
    [apiData],
  );

  return {
    data: apiData,
    columns,
  };
}
