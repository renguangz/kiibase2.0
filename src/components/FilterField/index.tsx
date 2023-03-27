import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { enhanceFilterField, EnhanceFilterFieldProps } from './enhanceFilterField';

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
    <div>
      {filtersAddForm.map((filter) => (
        <div key={`enhanceFilter_${Math.random()}`}>{enhanceFilterField(filter.component)(filter.props)}</div>
      ))}
      <button type="button" onClick={onSubmit}>
        送出
      </button>
    </div>
  );
}
