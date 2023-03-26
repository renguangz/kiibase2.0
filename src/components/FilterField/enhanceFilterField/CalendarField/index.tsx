import { FieldProps } from '@/src/utils';
import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';

export function CalendarField({ form, name }: FieldProps<any>) {
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <div>
            <Calendar inputId={field.name} value={field.value} onChange={field.onChange} dateFormat="dd/mm/yy" />
          </div>
        )}
      />
    </div>
  );
}
