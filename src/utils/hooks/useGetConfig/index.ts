import { pipe } from 'fp-ts/lib/function';
import { useMemo } from 'react';
import useSWR from 'swr';
import { fetchData } from '../../fetch';
import { combineApiUrl, isNotContentDynamicRouteYet } from '../../functions';

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
  list: { title: string; name: string; sortField: string }[];
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

type AddGetConfig = (route: string) => string;
const addGetConfig: AddGetConfig = (route) => `${route}/getConfig`;

export function useGetConfig(asPath: string) {
  const url = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : pipe(asPath, combineApiUrl, addGetConfig)),
    [isNotContentDynamicRouteYet, combineApiUrl, asPath, pipe, addGetConfig],
  );

  const { data: swrData, isLoading } = useSWR<ConfigDataType>(url, fetchData);

  const columns = useMemo(() => swrData?.list?.map((item) => ({ field: item.name, header: item.title })), [swrData]);

  return {
    data: swrData,
    columns,
    isLoading,
  };
}
