import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { enhanceFilterField, EnhanceFilterFieldProps } from './enhanceFilterField';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

type FilterType = {
  component: string;
  props: EnhanceFilterFieldProps;
};

export interface FilterFieldProps {
  onSubmit: () => void;
  form: UseFormReturn<any, any>;
  filters: FilterType[];
}

export function FilterField({ onSubmit, form, filters }: FilterFieldProps) {
  const filtersAddForm = useMemo(
    () => filters.map((filter) => ({ ...filter, props: { ...filter.props, form } })),
    [filters],
  );
  return (
    <Wrapper>
      {filtersAddForm.map((filter) => (
        <div key={`enhanceFilter_${Math.random()}`}>{enhanceFilterField(filter.component)(filter.props)}</div>
      ))}
      <button type="button" onClick={onSubmit}>
        送出
      </button>
    </Wrapper>
  );
}
