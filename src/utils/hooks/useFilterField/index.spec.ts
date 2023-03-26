import { renderHook } from '@testing-library/react-hooks';
import { useFilterField } from '.';

describe('useFilterField', () => {
  const setup = () => renderHook(() => useFilterField());

  it('should have date and input text filter', () => {});
});
