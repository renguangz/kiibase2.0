import { pipe } from 'fp-ts/lib/function';
import * as R from 'fp-ts/lib/Record';
import * as S from 'fp-ts/string';
import { environments } from '../environments';
import { isArray } from '../functions';

export const getClientCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

type RequestOptions = {
  params?: object;
  endpointPrefix?: string;
  responseParser?: (res: any) => any;
};

type CheckParamType = (item: unknown) => boolean;
const checkParamType: CheckParamType = (item) => {
  if (isArray(item)) return true;
  switch (typeof item) {
    case 'string':
      return item.trim() !== '';
    case 'boolean':
      return true;
    case 'number':
      return isFinite(item);
    default:
      return false;
  }
};

type StringifyParams = (params: Record<string, any>) => string;
export const stringifyParams: StringifyParams = (params) =>
  pipe(
    params,
    R.filter((v) => checkParamType(v)),
    R.reduceWithIndex('', (k, a, v) => `${a}&${k}=${v}`),
    S.replace('&', ''),
  );

const catchError = (error: any) => {
  if (error.status === 401) return { status: 401, message: 'unauthorized' };
  return error;
};

type RequestType = (endpoint: string, requestOptions: RequestInit & RequestOptions) => any;
export const request: RequestType = (endpoint, requestOptions) => {
  const token = getClientCookie('token');
  const paramsString = stringifyParams(requestOptions?.params ?? {});
  const search = paramsString === '' ? paramsString : `?${paramsString}`;
  const responseParser = requestOptions?.responseParser ?? ((res: any) => res.json());
  delete requestOptions?.responseParser;
  const url = `${environments.DOCKER_HOST}${endpoint}${search}`;

  return fetch(url, {
    ...requestOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(responseParser)
    .catch(catchError);
};
