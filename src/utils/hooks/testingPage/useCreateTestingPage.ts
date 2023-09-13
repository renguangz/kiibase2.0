import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import testingPageFields from '@/mocks/db/utils/getFields/testingPageFields.json';
import { formatSelectData, isFieldsApiData, mapNameToComponent } from '../useCreateContent';
import { pipe } from 'fp-ts/lib/function';

export function useCreateTestingPage() {
  const form = useForm();

  const getFieldsData = useMemo(() => testingPageFields, [testingPageFields]);

  const fieldsData = useMemo(
    () => (isFieldsApiData(getFieldsData) ? pipe(getFieldsData, mapNameToComponent, formatSelectData) : undefined),
    [isFieldsApiData, getFieldsData, mapNameToComponent, pipe, formatSelectData],
  );

  return {
    form,
    fieldsData,
  };
}
