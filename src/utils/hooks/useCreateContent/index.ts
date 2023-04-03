import { useMemo } from 'react';
import { environments } from '../../environments';
import useSWR from 'swr';
import { fetchData } from '../../fetch';

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

export function useCreateContent(asPath: string) {
  const url = useMemo(() => `${environments.API_HOST}${asPath}`, [environments, asPath]);

  const { data } = useSWR<ConfigDataType>(url, fetchData);

  return {
    data,
  };
}
