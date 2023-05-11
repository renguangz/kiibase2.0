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

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

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

type RequestOptionsTemplate = (method: RequestMethod, payload?: any) => Record<'method' | 'body', any>;
export const requestOptionsTemplate: RequestOptionsTemplate = (method, payload) =>
  pipe(
    {
      method,
      body: JSON.stringify(payload),
    },
    R.filter((v) => checkParamType(v)),
  );

type StringifyParams = (params: Record<string, any>) => string;
export const stringifyParams: StringifyParams = (params) =>
  pipe(
    params,
    R.filter((v) => checkParamType(v)),
    R.reduceWithIndex('', (k, a, v) => `${a}&${k}=${v}`),
    S.replace('&', ''),
  );

type RequestType = (endpoint: string, requestOptions: RequestInit & RequestOptions, isFormData?: boolean) => any;
export const request: RequestType = (endpoint, requestOptions, isFormData) => {
  const token = getClientCookie('token');
  const paramsString = stringifyParams(requestOptions?.params ?? {});
  const search = paramsString === '' ? paramsString : `?${paramsString}`;
  const responseParser =
    requestOptions?.responseParser ??
    ((res: any) => {
      if (!res.ok) {
        if (res.status === 401) return res.statusText;
        throw new Error(res.statusText);
      }
      return res.json();
    });
  delete requestOptions?.responseParser;
  const url = `${environments.DOCKER_HOST}${endpoint}${search}`;

  const promise = new Promise((resolve, reject) => {
    fetch(url, {
      ...requestOptions,
      headers: isFormData
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
    }).then((res) => {
      if (!res.ok) {
        reject(res.statusText);
      } else {
        resolve(res.json());
      }
    });
  });

  return promise;
};
