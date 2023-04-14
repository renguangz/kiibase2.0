import { FieldValues, UseFormReturn } from 'react-hook-form';
import { enhanceFilterField } from '../FilterField/enhanceFilterField';

interface ContentUpdateFieldProps {
  form: UseFormReturn<FieldValues, any>;
  fields: any[];
}

export function ContentUpdateField({ form, fields }: ContentUpdateFieldProps) {
  const testSelect = {
    type: 'SingleSelectComponent',
    label: '狀態',
    model: 'status',
    required: true,
    readonly: false,
    hint: '此欄位必填',
    options: [
      { name: 'test1', code: '123' },
      { name: 'test2', code: '23' },
    ],
    name: 'status',
    form,
  };
  return (
    <div>
      <div>ContentUpdateField</div>
      {fields.map((field) => (
        <div key={Math.random()}>{enhanceFilterField(field.type)({ ...field, form })}</div>
      ))}
    </div>
  );
}
