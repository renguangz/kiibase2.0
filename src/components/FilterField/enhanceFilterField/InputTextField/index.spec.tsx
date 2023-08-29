import { FieldProps } from '@/src/utils';
import { act, render, screen } from '@testing-library/react';
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

  it('should have default input value `test default input value`', () => {
    const defaultValues = { testInputTextField: 'test default input value' };
    const { result } = renderHook(() => useForm({ defaultValues }));
    const props = {
      form: result.current,
      require: false,
      name: 'testInputTextField',
    };
    const { input } = setup(props);
    expect(input).toHaveValue('test default input value');
  });

  it('should have default input value `0` with input type number and can only type number', async () => {
    const defaultValues = { numberInput: 0 };
    const { result } = renderHook(() => useForm({ defaultValues }));
    const props = {
      form: result.current,
      require: false,
      name: 'numberInput',
      inputType: 'number',
    };
    const { input } = setup(props);
    expect(input).toHaveValue(0);

    await userEvent.type(input, 'qaz');
    expect(input).toHaveValue(0);
    await userEvent.type(input, '123');
    expect(input).toHaveValue(123);
  });
});
