import { Control, FieldValues, UseFormReturn } from 'react-hook-form';

export type ComponentTypes = {
  children: JSX.Element | string;
  variant?: 'outlined' | 'contained' | 'text';
  size?: 'small' | 'medium' | 'large';
};

export type GenericDataType<T> = {
  status: number;
  message: string;
  data: T;
};

export type PrimaryKey = string | number;

export type FieldProps<D> = {
  defaultValue: D;
  form: UseFormReturn<any, any>;
  required: boolean;
  name: string;
  disabled?: boolean;
  hint?: string;
  placeholder?: string;
  control?: Control<FieldValues, any>;
  width?: number;
  height?: number;
};
