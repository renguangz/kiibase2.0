import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { environments } from '../environments';
import * as R from 'fp-ts/Record';

export const isArray = (data: any): boolean => Array.isArray(data);

export const isEvery = (rule: Function) => (data: Array<any>) => data.every((item) => rule(item));

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const isEmptyString = (value: string) => value.trim() === '';

export const hasTitleRule = <T extends object>(item: T) => 'title' in item;

export const isEveryItemHasTitle = isEvery(hasTitleRule);

export const reduceQueryParams = (object: Record<string, string>): string =>
  Object.keys(object).reduce((acc, cur) => (object[cur] ? (acc += `&${cur}=${object[cur]}`) : acc), '');

export const replaceFirstQuery = (data: string) => data.replace('&', '?');

export type StringSplitType = (splitTarget: string) => (path: string) => string[];
export const stringSplit: StringSplitType = (splitTarget) => (path) => path.split(splitTarget);

export const splitSlash = stringSplit('/');

export type GetContentPathType = (path: string) => string;
export const getContentPath: GetContentPathType = (path) =>
  pipe(
    path,
    splitSlash,
    A.lookup(1),
    O.map((s) => `/${s}`),
    O.getOrElse(() => '/'),
  );

type CombineUrl = (host: string) => (path: string) => string;
export const combineUrl: CombineUrl = (host) => (path) => `${host}${path}`;

export const combineApiUrl = combineUrl(environments.API_HOST);
export const combineStorageUrl = combineUrl(environments.STORAGE_HOST);

export type IsNotContentDynamicRouteYet = (asPath: string) => boolean;
export const isNotContentDynamicRouteYet: IsNotContentDynamicRouteYet = (asPath) => asPath.includes('[content]');

export type ReplaceSpacesWithPlus = (value: string) => string;
export const replaceSpacesWithPlus: ReplaceSpacesWithPlus = (value) => value.replaceAll(' ', '+');

export type FormatObjectValueWithPlus = (
  obj: Record<string, string | number | undefined>,
) => Record<string, string | number>;
export const formatObjectValueWithPlus: FormatObjectValueWithPlus = (obj) =>
  pipe(
    obj,
    R.filterMap(O.fromNullable),
    R.mapWithIndex((_k, v) => (typeof v === 'string' ? replaceSpacesWithPlus(v) : v)),
  );

export type FormatDateForm = (getFormValue: any) => Record<string, any>;
export const formatDateForm: FormatDateForm = (getFormValue) =>
  pipe(
    getFormValue,
    O.fromNullable,
    O.getOrElse(() => [] as any),
    R.filter((value) => isDate(value)),
    R.mapWithIndex((_key, value) => (isDate(value) ? value.toLocaleDateString() : value)),
  );

export type FormatNumberForm = (
  fields: Array<Record<string | 'inputType', any>> | undefined,
  getFormValue: any,
) => Record<string, number>;
export const formatNumberForm: FormatNumberForm = (fields, getFormValue) =>
  pipe(
    fields,
    O.fromNullable,
    O.getOrElse(() => [] as Record<string, any>[]),
    A.filter((field) => field.inputType === 'number'),
    A.reduce({}, (acc, cur: any) => ({ ...acc, [cur.model]: parseInt(getFormValue(cur.model ?? 0)) })),
  );

export type PadZero = (n: number) => string;
export const padZero: PadZero = (n) => (n < 10 ? `0${n}` : `${n}`);

export type FormatDateString = (date: Date) => string;
export const formatDateString: FormatDateString = (date) =>
  pipe(
    {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
    ({ year, month, day }) => `${year}-${padZero(month)}-${padZero(day)}`,
  );

export type FormatObjectDateToString = (
  obj: Record<string, string | number | Date | undefined>,
) => Record<string, string | number | undefined>;
export const formatObjectDateToString: FormatObjectDateToString = (obj) =>
  pipe(
    obj,
    R.mapWithIndex((_k, v) => (isDate(v) ? formatDateString(v) : v)),
  );

export type PipeFormatObject = (obj: Record<string, any | Date>) => Record<string, any | Date>;
export const pipeFormatObject: PipeFormatObject = (obj) =>
  pipe(obj, formatObjectDateToString, formatObjectValueWithPlus);

export type HasEmptyString = (values: string[]) => boolean;

export const hasEmptyString: HasEmptyString = (values) => values.some((value) => isEmptyString(value));
