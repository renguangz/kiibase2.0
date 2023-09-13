import { useCallback, useEffect, useMemo, useState } from 'react';
import { isNotContentDynamicRouteYet } from '@/utils/functions';
import useSWR from 'swr';
import { ApiDataResponse, ApiDataType } from '@/types/data';
import { useForm } from 'react-hook-form';
import { request, requestOptionsTemplate } from '@/utils/request';
import { useRouter } from 'next/router';

export type ContentDataType = {
  data: Array<Record<string, string | number>>;
  meta: Record<'current_page' | 'last_page' | 'to' | 'from' | 'total' | 'per_page', number>;
};

const INIT_QUERY_PARAMS = {
  page: 1,
  per_page: 10,
};

export function useContentList(asPath: string) {
  const router = useRouter();
  const tableForm = useForm();

  const [queryParams, setQueryParams] = useState<Record<string, any>>(INIT_QUERY_PARAMS);

  const endpoint = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : `/model${asPath}`),
    [isNotContentDynamicRouteYet, asPath],
  );

  const { data, mutate } = useSWR<ApiDataType<ContentDataType | undefined> | undefined>([
    endpoint,
    { params: queryParams },
  ]);

  const contentData = useMemo(() => data?.data ?? { data: [], meta: { total: 0 } }, [data]);

  const updatedListData = useMemo(() => {
    const formValue = tableForm.control._formValues;
    const formKeySet = new Set(Object.keys(formValue).map((key) => key.split('-')[0]));
    const listData = contentData?.data ?? [];
    const listDataChanged = listData
      .map((data) => {
        let obj: Record<'id' | string, string | number> = {};
        formKeySet.forEach((key) => {
          const formData: string | number = formValue[`${key}-${data['id']}`];
          const dataValue = data[key];
          if (formData?.toString().trim() !== dataValue?.toString().trim())
            obj = { ...obj, id: data.id, [key]: formData };
        });

        if ('id' in obj) return obj;
      })
      .filter((data) => data);
    return listDataChanged;
  }, [tableForm.watch(), contentData, asPath]);

  const updateButtonDisabled = useMemo(() => updatedListData.length === 0, [updatedListData]);

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

  const handleUpdateList = useCallback(async () => {
    const result: ApiDataType<boolean> = await request(
      `${endpoint}/updateList`,
      requestOptionsTemplate('PUT', updatedListData),
    );
    await mutate();
    return result?.status === 200 ? ApiDataResponse.SUCCESS : ApiDataResponse.ERROR;
  }, [endpoint, request, updatedListData]);

  const handleDeleteModel = useCallback(
    async (id: string | number) => {
      const result: ApiDataType<boolean> = await request(`${endpoint}/${id}`, requestOptionsTemplate('DELETE'));
      await mutate();
      return result?.status === 200 ? ApiDataResponse.SUCCESS : ApiDataResponse.ERROR;
    },
    [endpoint, request, mutate],
  );

  const resetQueryParams = () => {
    setQueryParams(INIT_QUERY_PARAMS);
  };

  return {
    tableForm,
    updateButtonDisabled,
    mutate,
    data: contentData?.data ?? [],
    total: contentData.meta.total,
    setQueryParams,
    queryParams,
    resetQueryParams,
    handleChangePage,
    handleChangePerPage,
    handleUpdateList,
    handleDeleteModel,
  };
}
