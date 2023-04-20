import { useMemo, useState } from 'react';
import { combineApiUrl, isNotContentDynamicRouteYet, reduceQueryParams, replaceFirstQuery } from '../../functions';
import useSWR from 'swr';
import { fetchDataWithQueries } from '../../fetch';

export function useContentList(asPath: string) {
  const [queryParams, setQueryParams] = useState<Record<string, any>>({
    page: 1,
    perPage: 10,
    sort: 'id%7Cdesc',
  });

  const url = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : combineApiUrl(asPath)),
    [isNotContentDynamicRouteYet, combineApiUrl, asPath],
  );
  const queryString = useMemo(
    () => replaceFirstQuery(reduceQueryParams(queryParams)),
    [replaceFirstQuery, reduceQueryParams, queryParams],
  );

  const { data, isLoading } = useSWR([url, queryString], fetchDataWithQueries);

  return {
    data: data?.data,
    total: data?.total,
    isLoading,
    setQueryParams,
  };
}
