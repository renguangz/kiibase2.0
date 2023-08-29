export type ApiDataType<D> = {
  status: number;
  message: string;
  data: D;
};

export enum ApiDataResponse {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warn',
}
