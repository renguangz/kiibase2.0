import { Controller } from 'react-hook-form';
import { AutoComplete } from 'primereact/autocomplete';
import { FieldProps } from '@/src/utils';

interface AutoCompleteFieldProps extends FieldProps<any> {
  options: any[];
}

export function AutoCompleteField({ form, options }: AutoCompleteFieldProps) {
  return (
    <div>
      <Controller
        name="value"
        control={form.control}
        render={({ field }) => (
          <div>
            <AutoComplete
              inputId={field.name}
              value={field.value}
              onChange={field.onChange}
              inputRef={field.ref}
              suggestions={options ?? []} // 選項
              completeMethod={() => {}} // 輸入之後會去呼叫的 function
            />
          </div>
        )}
      />
    </div>
  );
}
