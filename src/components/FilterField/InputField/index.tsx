import { Input, InputProps } from 'antd';
import { FilterLayoutField, FilterLayoutFieldProps } from '../FilterLayoutField';

type InputFieldProps = Pick<FilterLayoutFieldProps, 'label'> & {
  inputProps: InputProps;
};

export function InputField({ label, inputProps }: InputFieldProps) {
  return (
    <FilterLayoutField label={label}>
      <Input data-testid="searchInput" {...inputProps} />
    </FilterLayoutField>
  );
}
