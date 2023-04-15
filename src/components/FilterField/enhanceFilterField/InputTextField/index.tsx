import { Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { FieldProps } from '@/src/utils';

export function InputTextField({ form, name }: FieldProps<string>) {
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <div>
            <InputText id={field.name} />
          </div>
        )}
      />
    </div>
  );
}
