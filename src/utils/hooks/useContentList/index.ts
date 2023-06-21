import { useCallback, useMemo, useState } from 'react';
import { isNotContentDynamicRouteYet } from '../../functions';
import useSWR from 'swr';
import { ApiDataResponse, ApiDataType } from '@/src/types/data';
import { useForm } from 'react-hook-form';
import { request, requestOptionsTemplate } from '../../request';

type ContentDataType = {
  data: Array<Record<string, string | number>>;
  meta: Record<'current_page' | 'last_page' | 'to' | 'from' | 'total' | 'per_page', number>;
};

export function useContentList(asPath: string) {
  const tableForm = useForm();

  const [queryParams, setQueryParams] = useState<Record<string, any>>({
    page: 1,
    per_page: 10,
  });

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
    tableForm.watch();
    const formValue = tableForm.control._formValues;
    const formKeySet = new Set(Object.keys(formValue).map((key) => key.split('-')[0]));
    const listData = contentData?.data ?? [];
    const listDataChanged = listData
      .map((data) => {
        let obj: Record<'id' | string, string | number> = {};
        formKeySet.forEach((key) => {
          const formData: string | number = formValue[`${key}-${data['id']}`];
          const dataValue = data[key];
          if (formData.toString().trim() !== dataValue.toString().trim())
            obj = { ...obj, id: data.id, [key]: formData };
        });

        if ('id' in obj) return obj;
      })
      .filter((data) => data);
    return listDataChanged;
  }, [tableForm.watch(), contentData]);

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

  return {
    tableForm,
    updateButtonDisabled,
    data: contentData?.data ?? [],
    total: contentData.meta.total,
    setQueryParams,
    queryParams,
    handleChangePage,
    handleChangePerPage,
    handleUpdateList,
  };
}
