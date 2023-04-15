import { FieldProps } from '@/src/utils';
import { act, fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { InputTextField } from '.';
import userEvent from '@testing-library/user-event';

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
      await userEvent.type(input, 'test new value');
    });

    expect(input).toHaveValue('test new value');

    await act(async () => {
      await userEvent.type(input, ' update input value');
    });

    expect(input).toHaveValue('test new value update input value');
  });

  it('should change input value', async () => {
    const defaultValues = { testInputTextField: '' };
    const { result } = renderHook(() => useForm({ defaultValues }));
    const props = {
      form: result.current,
      required: false,
      name: 'testInputTextField',
    };
    const { input } = setup(props);
    expect(input).toHaveValue('');

    await userEvent.type(input, 'input will change');
    expect(input).toHaveValue('input will change');
  });
});
