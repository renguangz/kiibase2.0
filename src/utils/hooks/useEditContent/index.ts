import { pipe } from 'fp-ts/lib/function';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as A from 'fp-ts/Array';
import { formatDateForm, formatNumberForm, isNotContentDynamicRouteYet } from '../../functions';
import { request, requestOptionsTemplate } from '../../request';
import { GenericDataType } from '../../types';
import { formatSelectData, isFieldsApiData, mapNameToComponent } from '../useCreateContent';
import { ConfigDataFieldType, useGetConfig } from '../useGetConfig';
import { filter } from 'fp-ts/lib/Record';

export function useEditContent(asPath: string, editId: string) {
  const router = useRouter();
  const { push } = router;

  const [openModal, setOpenModal] = useState(false);

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

  const defaultValues = useMemo(
    () => fieldsData?.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.default }), {}) ?? {},
    [fieldsData],
  );
  const form = useForm();

  const handleOpenConfirmModal = useCallback(() => setOpenModal(true), [setOpenModal]);

  const deleteContent = useCallback(async () => {
    await request(`/model${editUrl}`, requestOptionsTemplate('DELETE'));
    push(listPageUrl);
  }, [request, push, requestOptionsTemplate, editUrl, listPageUrl]);

  const handleSubmitUpdate = useCallback(async () => {
    const numberForm = formatNumberForm(fieldsData, form.getValues);
    const dateForm = formatDateForm(form.control._formValues);

    const formValue = pipe(
      form.watch(),
      filter((value) => value),
    );
    const payload = {
      ...formValue,
      ...numberForm,
      ...dateForm,
    };
    const result: GenericDataType<null> = await request(`/model${editUrl}`, requestOptionsTemplate('PUT', payload));

    if (result.status === 200) push(listPageUrl);
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
  };
}
