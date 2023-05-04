import { useCallback, useMemo, useState } from 'react';
import { isNotContentDynamicRouteYet } from '../../functions';
import useSWR from 'swr';

export function useContentList(asPath: string) {
  const [queryParams, setQueryParams] = useState<Record<string, any>>({
    page: 1,
    per_page: 10,
    sort: 'id%7Cdesc',
  });

  const endpoint = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : asPath),
    [isNotContentDynamicRouteYet, asPath],
  );

  const { data } = useSWR([endpoint, { params: queryParams }]);

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
    setQueryParams,
    queryParams,
    handleChangePage,
    handleChangePerPage,
  };
}
