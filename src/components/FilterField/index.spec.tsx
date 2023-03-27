import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { FilterField, FilterFieldProps } from '.';

describe('FilterField', () => {
  const renderUseForm = (defaultValues: Record<string, any>) => {
    const { result } = renderHook(() => useForm({ defaultValues })) as any;
    return result.current;
  };
  const mockOnSubmit = jest.fn();

  const initProps = {
    onSubmit: mockOnSubmit,
  };

  const setup = (props: FilterFieldProps) => {
    render(<FilterField {...props} />);
    const submitButton = screen.getByRole('button', { name: /送出/ });
    return {
      submitButton,
    };
  };

  it('should call the submit function', async () => {
    const { submitButton } = setup({ ...initProps, form: renderUseForm({}), filters: [] });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should have a start and a end calendar, input text field', async () => {
    const filters = [
      {
        component: 'InputTextComponent',
        props: {
          label: 'test label',
          name: 'tableTitleSearch',
          required: true,
        },
      },
      {
        component: 'CalendarComponent',
        props: {
          label: 'test start_date',
          name: 'start_date',
          required: false,
        },
      },
      {
        component: 'CalendarComponent',
        props: {
          label: 'test end_date',
          name: 'end_date',
          required: false,
        },
      },
    ];
    setup({ ...initProps, form: renderUseForm({}), filters });

    const input = document.getElementById('tableTitleSearch') as HTMLInputElement;
    expect(input.value).toBe('');

    const start_date = document.getElementById('start_date') as HTMLInputElement;
    const end_date = document.getElementById('end_date') as HTMLInputElement;
    expect(start_date).toBeInTheDocument();
    expect(end_date).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(3);
  });

  it('should have default value `test input text`', async () => {
    const filters = [
      {
        component: 'InputTextComponent',
        props: {
          label: 'test',
          name: 'testDefaultValue',
          required: false,
        },
      },
    ];
    const defaultValues = {
      testDefaultValue: 'test input text',
    };
    const form = renderUseForm(defaultValues);
    setup({ ...initProps, form, filters });
    expect(form.watch()['testDefaultValue']).toBe('test input text');
  });

  it('should have only one calendar', async () => {
    setup({
      ...initProps,
      form: renderUseForm({}),
      filters: [
        {
          component: 'CalendarComponent',
          props: {
            label: 'only on calendar',
            name: 'single_calendar',
            required: false,
          },
        },
      ],
    });
    const start_date = document.getElementById('single_calendar') as HTMLInputElement;
    expect(start_date).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(1);
  });

  it('should change form value after click submit button', async () => {
    const filters = [
      {
        component: 'InputTextComponent',
        props: {
          label: 'test label',
          name: 'tableTitleSearch',
          required: true,
        },
      },
      {
        component: 'CalendarComponent',
        props: {
          label: 'test start_date',
          name: 'start_date',
          required: false,
        },
      },
      {
        component: 'CalendarComponent',
        props: {
          label: 'test end_date',
          name: 'end_date',
          required: false,
        },
      },
    ];
    const defaultValues = {
      tableTitleSearch: '',
    };
    const form = renderUseForm(defaultValues);

    setup({ ...initProps, form, filters });

    const keys = Object.keys(form.watch());
    keys.forEach((key) => {
      if (key === 'tableTitleSearch') {
        expect(form.watch()?.[key]).toBe('');
      } else {
        expect(form.watch()?.[key]).toBeUndefined();
      }
    });

    const tableTitleSearch = document.getElementById('tableTitleSearch') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(tableTitleSearch, { target: { value: 'add value' } });
    });

    expect(form.watch()['tableTitleSearch']).toEqual('add value');
    expect(tableTitleSearch.value).toEqual('add value');
  });

  it('should change date after clicking calendar', async () => {
    const filters = [
      {
        component: 'CalendarComponent',
        props: {
          label: 'calendar should change date',
          name: 'calendarChangeDate',
          required: false,
        },
      },
    ];
    const defaultValues = {};
    const form = renderUseForm(defaultValues);
    setup({ ...initProps, form, filters });

    const calendar = document.getElementById('calendarChangeDate') as HTMLInputElement;
    expect(calendar).toHaveValue('');

    userEvent.type(calendar, '2023-03-28');
    // expect(calendar).toHaveValue('2023/3/28');
  });
});
