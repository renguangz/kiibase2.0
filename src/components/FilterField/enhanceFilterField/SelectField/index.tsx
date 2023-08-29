import { FieldProps } from '@/src/utils';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

interface SelectFieldProps extends FieldProps<any> {
  options: { value: string; label: string }[];
}

export function SelectField({ form, options, name, hint, placeholder }: SelectFieldProps) {
  const { control } = form;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: hint }}
        render={({ field }) => (
          <Dropdown
            placeholder={placeholder ?? '請選擇'}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            options={options ?? []}
          />
        )}
      />
    </div>
  );
}
