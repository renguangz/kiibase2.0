import { FieldProps } from '@/utils';
import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';

export function CalendarField({ form, name, required }: FieldProps<any>) {
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        rules={{ required }}
        render={({ field }) => (
          <div>
            <Calendar
              inputId={field.name}
              value={new Date(field.value)}
              onChange={field.onChange}
              dateFormat="yy/mm/dd"
            />
          </div>
        )}
      />
    </div>
  );
}
