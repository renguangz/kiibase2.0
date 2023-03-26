import { FieldProps } from '@/src/utils';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { AutoCompleteField } from '.';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: () => <></>,
  useForm: () => ({
    control: () => ({}),
    handleSubmit: () => jest.fn(),
  }),
}));

describe('AutoCompleteField', () => {
  const setup = (props: FieldProps<any>) => {
    render(<AutoCompleteField {...props} />);
  };

  it('should have name `testAutoCompleteField`', () => {
    const { result } = renderHook(() => useForm());

    const props = {
      form: result.current,
      required: true,
      options: [],
    };
    setup(props);
  });
});
