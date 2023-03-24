import { useMemo, useState } from 'react';
import { reduceQueryParams, replaceFirstQuery } from '../../functions';
import useSWR from 'swr';
import { environments } from '../../environments';
import { fetchDataWithQueries } from '../../fetch';

export function useContentList(asPath: string) {
  const [queryParams, setQueryParams] = useState<Record<string, any>>({});

  const url = useMemo(() => `${environments.API_HOST}${asPath}`, [environments, asPath]);
  const queryString = useMemo(
    () => replaceFirstQuery(reduceQueryParams(queryParams)),
    [replaceFirstQuery, reduceQueryParams, queryParams],
  );

  const { data, isLoading } = useSWR([url, queryString], fetchDataWithQueries);

  return {
    data,
    isLoading,
    setQueryParams,
  };
}
