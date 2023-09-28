import { useCallback, useRef, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { request } from '@/utils/request';
import { GenericDataType } from '@/utils/types';
import { Toast } from 'primereact/toast';
import { useCommon } from '../useCommon';

type UploadImageResponseType = GenericDataType<{ filePath: string; fileUrl: string }>;

const isUploadFileResponse = (object: unknown): object is UploadImageResponseType => {
  if (object && typeof object === 'object') return 'status' in object;
  return false;
};

export function useImageUpload(
  folderRoute: string,
  form: UseFormReturn<FieldValues, any>,
  name: string,
  imageUrl?: string,
) {
  const toast = useRef<Toast>(null);

  const { showSuccess, showError } = useCommon();

  const [displayImage, setDisplayImage] = useState<string | undefined>(imageUrl);

  const onImageChange = useCallback(
    async (event: any) => {
      const img = event.target.files?.[0];
      if (!img) return;

      const formData = new FormData();
      formData.append('file', img);
      formData.append('folder', folderRoute);

      try {
        const result = await request(
          `/model${folderRoute}/upload/file`,
          {
            method: 'POST',
            body: formData,
          },
          true,
        );

        if (isUploadFileResponse(result)) {
          form.setValue(name, result.data.filePath);
          setDisplayImage(() => result.data.fileUrl);
          showSuccess({ detail: '圖片上傳成功' }, toast);
        }
      } catch (error) {
        const detail = error instanceof Error ? JSON.parse(error.message) : '失敗，請再試一次';
        showError({ detail }, toast);
      }
    },
    [setDisplayImage, request, URL, isUploadFileResponse, form, name],
  );

  return {
    toast,
    displayImage,
    setDisplayImage,
    onImageChange,
  };
}
