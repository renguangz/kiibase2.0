import { FieldProps } from '@/src/utils';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

interface DropdownFieldProps extends FieldProps<any> {
  options: { code: string; name: string }[];
}

export function DropdownField({ form, options, name, hint, placeholder }: DropdownFieldProps) {
  const { control } = form;
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: hint }}
        render={({ field }) => (
          <Dropdown
            value={field.value}
            optionLabel={name}
            placeholder={placeholder}
            name={name}
            options={options}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
