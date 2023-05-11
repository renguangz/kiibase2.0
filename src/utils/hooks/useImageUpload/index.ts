import { ChangeEvent, useCallback, useState } from 'react';
import { request } from '../../request';

export function useImageUpload() {
  const [displayImage, setDisplayImage] = useState<string | undefined>(undefined);

  const onImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const img = event.target.files?.[0];
      if (!img) return;

      const formData = new FormData();
      formData.append('file', img);
      formData.append('folder', 'banner');

      await request(
        '/upload/file',
        {
          method: 'POST',
          body: formData,
        },
        true,
      );

      setDisplayImage(() => URL.createObjectURL(img));
    },
    [setDisplayImage, request, URL],
  );

  return {
    displayImage,
    setDisplayImage,
    onImageChange,
  };
}
