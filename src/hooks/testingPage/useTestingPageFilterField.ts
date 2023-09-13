import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useTestingPageFilterField() {
  const form = useForm();

  const filters = useMemo(
    () => [
      { component: 'InputTextComponent', props: { label: 'test input', name: 'filter', required: false } },
      { component: 'EditorComponent', props: { label: 'test editor', name: 'editorTest' } },
    ],
    [],
  );

  const handleSearch = useCallback(() => {}, []);

  return {
    form,
    data: filters,
    handleSearch,
  };
}
