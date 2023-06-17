import { useCallback, useMemo, useState } from 'react';
import { isNotContentDynamicRouteYet } from '../../functions';
import useSWR from 'swr';
import { ApiDataType } from '@/src/types/data';

type ContentDataType = {
  data: Array<{
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }>;
  meta: Record<'current_page' | 'last_page' | 'to' | 'from' | 'total' | 'per_page', number>;
};

export function useContentList(asPath: string) {
  const [queryParams, setQueryParams] = useState<Record<string, any>>({
    page: 1,
    per_page: 10,
  });

  const endpoint = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : `/model${asPath}`),
    [isNotContentDynamicRouteYet, asPath],
  );

  const { data } = useSWR<ApiDataType<ContentDataType | undefined> | undefined>([endpoint, { params: queryParams }]);

  const contentData = useMemo(() => data?.data ?? { data: [], meta: { total: 0 } }, [data]);

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
    data: contentData?.data ?? [],
    total: contentData.meta.total,
    setQueryParams,
    queryParams,
    handleChangePage,
    handleChangePerPage,
  };
}
