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

export * from './typeGuards';
