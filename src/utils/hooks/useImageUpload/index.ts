import { useCallback, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { request } from '../../request';
import { GenericDataType } from '../../types';

type UploadImageResponseType = GenericDataType<{ filePath: string }>;

const isUploadFileResponse = (object: unknown): object is UploadImageResponseType => {
  if (object && typeof object === 'object') return 'status' in object;
  return false;
};

export function useImageUpload(folderRoute: string, form: UseFormReturn<FieldValues, any>, name: string) {
  const [displayImage, setDisplayImage] = useState<string | undefined>(undefined);

  const onImageChange = useCallback(
    async (event: any) => {
      const img = event.target.files?.[0];
      if (!img) return;

      const formData = new FormData();
      formData.append('file', img);
      formData.append('folder', folderRoute);

      const result = await request(
        `/model/${folderRoute}/upload/file`,
        {
          method: 'POST',
          body: formData,
        },
        true,
      );

      if (isUploadFileResponse(result)) {
        form.setValue(name, result.data.filePath);
        setDisplayImage(() => URL.createObjectURL(img));
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
