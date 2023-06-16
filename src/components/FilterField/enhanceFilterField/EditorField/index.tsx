import { FieldProps } from '@/src/utils';
import { request } from '@/src/utils/request';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';

export function EditorField({ form, name, width, height }: FieldProps<any>) {
  // FIXME: 上傳圖片要打api
  const handleTextChange = useCallback(
    async (e: EditorTextChangeEvent) => {
      const editorContent = e.htmlValue;
      const hasImage = editorContent?.includes('<img') ?? null;

      if (hasImage) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(editorContent ?? '', 'text/html');
        const imageElement = doc.querySelector('img');
        const imageUrl = imageElement?.getAttribute('src') ?? '';

        const url = new URL(imageUrl);
        const fileName = url.pathname.split('/').pop() ?? 'image.png';

        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const file = new File([blob], fileName, { type: 'image/png' });

        const formData = new FormData();
        formData.append('file', file);

        const result = await request('/upload/quill', {
          method: 'POST',
          body: formData,
        });
      }
    },
    [request],
  );

  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <div style={{ width: width ?? 720, height: height ?? 350 }}>
            <Editor
              id={field.name}
              onTextChange={(e) => {
                field.onChange(e.textValue);
                handleTextChange(e);
              }}
              style={{ width: width ?? 720, height: height ?? 350 }}
            />
          </div>
        )}
      />
    </div>
  );
}
