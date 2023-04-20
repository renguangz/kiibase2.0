import { FieldProps } from '@/src/utils';
import { Controller } from 'react-hook-form';
import { Select } from 'antd';

interface DropdownFieldProps extends FieldProps<any> {
  options: { value: string; label: string }[];
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
          <Select
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
