import { useCallback, useMemo, useState } from 'react';
import { combineApiUrl, isNotContentDynamicRouteYet, reduceQueryParams, replaceFirstQuery } from '../../functions';
import useSWR from 'swr';
import { fetchDataWithQueries } from '../../fetch';

export function useContentList(asPath: string) {
  const [queryParams, setQueryParams] = useState<Record<string, any>>({
    page: 1,
    per_page: 10,
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

  const handleChangePage = useCallback(
    (currentPage: number) => {
      setQueryParams((query) => ({ ...query, page: currentPage }));
    },
    [setQueryParams],
  );

  const handleChangePerPage = useCallback(
    (pageSize: number) => {
      setQueryParams((query) => ({ ...query, page: 1, per_page: pageSize }));
    },
    [setQueryParams],
  );

  return {
    data: data?.data,
    total: data?.total,
    isLoading,
    setQueryParams,
    queryParams,
    handleChangePage,
    handleChangePerPage,
  };
}
