import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { fetchData } from '../../fetch';
import { combineApiUrl, isNotContentDynamicRouteYet } from '../../functions';

export function useEditContent(asPath: string) {
  const url = useMemo(
    () => (isNotContentDynamicRouteYet(asPath) ? '' : combineApiUrl(asPath)),
    [isNotContentDynamicRouteYet, combineApiUrl, asPath],
  );

  const { data } = useSWR(url, fetchData);

  const defaultValues = useMemo(() => data?.module?.[0]?.data ?? {}, [data]);
  const form = useForm();

  useEffect(() => {
    if (Object.keys(defaultValues).length === 0) return;
    form.reset({ ...defaultValues });
  }, [form, defaultValues]);

  return {
    data,
    form,
  };
}
