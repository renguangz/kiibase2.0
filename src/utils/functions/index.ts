import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { environments } from '../environments';
import * as R from 'fp-ts/Record';

export const isArray = (data: any): boolean => Array.isArray(data);

export const isEvery = (rule: Function) => (data: Array<any>) => data.every((item) => rule(item));

export const hasTitleRule = <T>(item: T) => 'title' in item;

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

type CombineApiUrl = (path: string) => string;
export const combineApiUrl: CombineApiUrl = (path) => `${environments.DOCKER_HOST}${path}`;

export type IsNotContentDynamicRouteYet = (asPath: string) => boolean;
export const isNotContentDynamicRouteYet: IsNotContentDynamicRouteYet = (asPath) => asPath.includes('[content]');

export type ReplaceSpacesWithPlus = (value: string) => string;
export const replaceSpacesWithPlus: ReplaceSpacesWithPlus = (value) => value.replaceAll(' ', '+');

export type FormatObjectValueWithPlus = (obj: Record<string, string | undefined>) => Record<string, string>;
export const formatObjectValueWithPlus: FormatObjectValueWithPlus = (obj) =>
  pipe(obj, R.filterMap(O.fromNullable), R.map(replaceSpacesWithPlus));

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
    A.reduce({}, (acc, cur: any) => ({ ...acc, [cur.name]: parseInt(getFormValue(cur.name ?? 0)) })),
  );
