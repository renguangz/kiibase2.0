import { FieldProps } from '@/src/utils';
import { Controller } from 'react-hook-form';
import { InputTextarea } from 'primereact/inputtextarea';

interface TextareaFieldProps extends FieldProps<string> {
  rows?: number;
}

export function TextareaField({ form, name, required, disabled, rows, placeholder, width }: TextareaFieldProps) {
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        rules={{ required }}
        render={({ field }) => (
          <div style={{ width: width ?? 'auto' }}>
            <InputTextarea
              role="dialog"
              autoResize
              rows={rows ?? 2}
              disabled={disabled}
              style={{ width: '100%', height: '100%' }}
              id={field.name}
              value={field.value ?? ''}
              placeholder={placeholder ?? '請輸入'}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </div>
        )}
      />
    </div>
  );
}
