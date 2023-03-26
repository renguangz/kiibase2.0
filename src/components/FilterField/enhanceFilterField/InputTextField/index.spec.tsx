import { FieldProps } from '@/src/utils';
import { act, fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { InputTextField } from '.';

describe('InputTextField', () => {
  const setup = (props: FieldProps<string>) => {
    render(<InputTextField {...props} />);
    const input = document.getElementById(props.name) as HTMLInputElement;
    return { input };
  };

  it('should have input with id `testInputTextField`', async () => {
    const defaultValues = {
      testInputTextField: '',
    };
    const { result } = renderHook(() => useForm({ defaultValues }));
    const props = {
      form: result.current,
      required: true,
      name: 'testInputTextField',
    };
    const { input } = setup(props);

    expect(input.value).toBe('');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test new value' } });
    });

    expect(result.current.getValues('testInputTextField')).toEqual('test new value');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'update input value' } });
    });

    expect(result.current.getValues('testInputTextField')).toEqual('update input value');
  });
});
