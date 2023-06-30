import { FieldProps } from '@/src/utils';
import { Controller } from 'react-hook-form';
import { InputTextarea } from 'primereact/inputtextarea';

interface TextareaFieldProps extends FieldProps<string> {}

export function TextareaField({ form, name, required, disabled, placeholder, width, height }: TextareaFieldProps) {
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        rules={{ required }}
        render={({ field }) => (
          <div>
            <InputTextarea
              role="dialog"
              disabled={disabled}
              style={{ width: '100%;' }}
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
