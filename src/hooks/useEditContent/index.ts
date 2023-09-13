import { pipe } from 'fp-ts/lib/function';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as A from 'fp-ts/Array';
import { formatDateForm, formatNumberForm, isNotContentDynamicRouteYet } from '@/utils/functions';
import { request, requestOptionsTemplate } from '@/utils/request';
import { GenericDataType } from '@/utils/types';
import { formatSelectData, isFieldsApiData, mapNameToComponent, ResponseMessageType } from '../useCreateContent';
import { ConfigDataFieldType, useGetConfig } from '../useGetConfig';

export function useEditContent(asPath: string, editId: string) {
  const router = useRouter();
  const { push } = router;

  const form = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [editResponseMessage, setEditResponseMessage] = useState<ResponseMessageType>(null);

  const url = useMemo(() => (isNotContentDynamicRouteYet(asPath) ? '' : asPath), [isNotContentDynamicRouteYet, asPath]);
  const editUrl = useMemo(() => url.replace('/edit', ''), [url]);
  const folderUrl = useMemo(() => editUrl.replace(`/${editId}`, ''), [editUrl, editId]);

  const { data } = useGetConfig(editUrl);

  const fieldsData: (ConfigDataFieldType & { name: string })[] | undefined = useMemo(
    () =>
      data && isFieldsApiData(data.field)
        ? pipe(
            data.field,
            mapNameToComponent,
            formatSelectData,
            A.map((data: any) => ({ ...data, folder: folderUrl })),
          )
        : undefined,
    [data, isFieldsApiData, pipe, mapNameToComponent, formatSelectData, folderUrl],
  );

  const listPageUrl = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : asPath.split(editId)[0]),
    [isNotContentDynamicRouteYet, asPath, editId],
  );

  const requiredFields = useMemo(() => fieldsData?.filter((field) => field.required === true), [fieldsData]);

  const requiredImageUploadFields = useMemo(
    () => requiredFields?.filter((field) => field.type === 'ImageUploadComponent') ?? [],
    [requiredFields],
  );

  const requiredImageUploadFieldsAreEmpty = useMemo(
    () => requiredImageUploadFields.some((field) => !form.getValues(field.name)),
    [requiredImageUploadFields, form.watch()],
  );

  const defaultValues = useMemo(
    () => fieldsData?.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.default }), {}) ?? {},
    [fieldsData],
  );
  const handleOpenConfirmModal = useCallback(() => setOpenModal(true), [setOpenModal]);

  const deleteContent = useCallback(async () => {
    await request(`/model${editUrl}`, requestOptionsTemplate('DELETE'));
    push(listPageUrl);
  }, [request, push, requestOptionsTemplate, editUrl, listPageUrl]);

  const handleSubmitUpdate = useCallback(async () => {
    const numberForm = formatNumberForm(fieldsData, form.getValues);
    const dateForm = formatDateForm(form.control._formValues);

    const payload = {
      ...form.watch(),
      ...numberForm,
      ...dateForm,
    };
    const result: GenericDataType<null> = await request(`/model${editUrl}`, requestOptionsTemplate('PUT', payload));

    if (result.status === 200) {
      setEditResponseMessage({ type: 'success', message: '更新成功' });
      if (data?.is_single_data) return;
      push(listPageUrl);
    } else {
      setEditResponseMessage({ type: 'error', message: result?.message ?? '' });
    }
  }, [request, requestOptionsTemplate, editUrl, data, form, formatNumberForm, fieldsData, push, listPageUrl]);

  useEffect(() => {
    if (Object.keys(defaultValues).length === 0) return;
    form.reset({ ...defaultValues });
  }, [form, defaultValues]);

  return {
    data,
    fieldsData,
    deleteContent,
    handleOpenConfirmModal,
    openModal,
    setOpenModal,
    handleSubmitUpdate,
    form,
    listPageUrl,
    requiredImageUploadFieldsAreEmpty,
    editResponseMessage,
  };
}
