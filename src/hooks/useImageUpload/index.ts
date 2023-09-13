import { useCallback, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { request } from '@/utils/request';
import { GenericDataType } from '@/utils/types';

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
  const [displayImage, setDisplayImage] = useState<string | undefined>(imageUrl);

  const onImageChange = useCallback(
    async (event: any) => {
      const img = event.target.files?.[0];
      if (!img) return;

      const formData = new FormData();
      formData.append('file', img);
      formData.append('folder', folderRoute);

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
      }
    },
    [setDisplayImage, request, URL, isUploadFileResponse, form, name],
  );

  return {
    displayImage,
    setDisplayImage,
    onImageChange,
  };
}
