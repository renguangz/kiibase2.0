import { FieldValues, UseFormReturn } from 'react-hook-form';
import { enhanceFilterField } from '../FilterField/enhanceFilterField';

interface ContentUpdateFieldProps {
  form: UseFormReturn<FieldValues, any>;
  fields: any[];
}

export function ContentUpdateField({ form, fields }: ContentUpdateFieldProps) {
  return (
    <div>
      <div>ContentUpdateField</div>
      {fields.map((field) => (
        <div key={Math.random()}>{enhanceFilterField(field.type)({ ...field, form, folder: 'banner' })}</div>
      ))}
    </div>
  );
}
