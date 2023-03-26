import { FieldProps } from '@/src/utils';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { CalendarField } from '.';

describe('CalendarField', () => {
  const setup = (props: FieldProps<string>) => {
    render(<CalendarField {...props} />);
    const input = document.getElementById(props.name) as HTMLInputElement;
    return { input };
  };
  it('should select date', async () => {
    const defaultValues = {
      testCalendar: '',
    };
    const { result } = renderHook(() => useForm({ defaultValues }));
    const props = {
      form: result.current,
      required: true,
      name: 'testCalendar',
    };
    const { input } = setup(props);

    expect(input.value).toBe('');

    await act(async () => {
      fireEvent.click(input);
    });
  });
});
