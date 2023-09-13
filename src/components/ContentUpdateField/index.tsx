import { COLORS } from '@/utils';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { enhanceFilterField } from '../FilterField/enhanceFilterField';

const Wrapper = styled.form`
  border: 1px solid ${COLORS.lightGray};
  width: 100%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface ContentUpdateFieldProps {
  form: UseFormReturn<FieldValues, any>;
  fields: any[];
}

export function ContentUpdateField({ form, fields }: ContentUpdateFieldProps) {
  return (
    <Wrapper>
      {fields.map((field) => (
        <div key={field.name}>{enhanceFilterField(field.type)({ ...field, form })}</div>
      ))}
    </Wrapper>
  );
}
