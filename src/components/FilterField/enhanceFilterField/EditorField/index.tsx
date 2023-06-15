import { FieldProps } from '@/src/utils';
import { Editor } from 'primereact/editor';
import { Controller } from 'react-hook-form';

export function EditorField({ form, name, width, height }: FieldProps<any>) {
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <div style={{ width: width ?? 720, height: height ?? 350 }}>
            <Editor
              id={field.name}
              onTextChange={(e) => field.onChange(e.textValue)}
              style={{ width: width ?? 720, height: height ?? 350 }}
            />
          </div>
        )}
      />
    </div>
  );
}
