import { render, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { EditorField } from '.';

describe('EditorField', () => {
  const { result } = renderHook(() => useForm());

  beforeEach(() => {
    render(<EditorField name="testEditor" form={result.current} defaultValue={undefined} required={false} />);
  });

  it('', () => {});
});
