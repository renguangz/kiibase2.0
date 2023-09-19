import { Controller } from 'react-hook-form';
import { MultiSelect } from 'primereact/multiselect';
import { FieldProps } from '/src/utils';

interface MultipleSelectFieldProps extends FieldProps<any> {
  options: { id: string; name: string }[];
}

export function MultipleSelectField({ form, name, required, placeholder, options }: MultipleSelectFieldProps) {
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <MultiSelect
          placeholder={placeholder ?? '請選擇'}
          onChange={(e) => field.onChange(e)}
          value={field.value}
          options={options ?? []}
        />
      )}
    />
  );
}
