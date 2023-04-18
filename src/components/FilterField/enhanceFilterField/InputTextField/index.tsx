import { Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { FieldProps } from '@/src/utils';

interface InputTextFieldProps extends FieldProps<string> {
  inputType?: 'number';
}

export function InputTextField({ form, name, inputType }: InputTextFieldProps) {
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <div>
            <InputText
              id={field.name}
              type={inputType}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </div>
        )}
      />
    </div>
  );
}
