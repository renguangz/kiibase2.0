import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { CalendarField } from '.';

describe('CalendarField', () => {
  const mockDate = new Date('2023-04-27T00:00:00');
  const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  afterAll(() => spy.mockRestore());

  it('should change display value to chosen date', async () => {
    const { result } = renderHook(() => useForm());
    const props = {
      form: result.current,
      name: 'testCalendar',
    };
    render(<CalendarField defaultValue={undefined} required={false} {...props} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    const chosenDate = screen.queryAllByText('27')[1] as HTMLSpanElement;
    await userEvent.click(chosenDate);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
