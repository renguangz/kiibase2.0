import useSWR from 'swr';
import EditBanner4 from '@/src/mock/db/utils/EditContent/EditBanner4.json';
import { renderHook } from '@testing-library/react-hooks';
import { useEditContent } from '.';

jest.mock('swr');

describe('useEditContent', () => {
  (useSWR as jest.Mock).mockImplementation((url: string) => ({
    data: EditBanner4,
  }));

  it('should return EditBanner4 if url is `banner/4/edit`', async () => {
    const { result } = renderHook(() => useEditContent('/banner/4/edit'));
    expect(result.current.data).toStrictEqual(EditBanner4);
    expect(useSWR).toHaveBeenLastCalledWith('/banner/4/edit');
  });

  it('should have form with default value EditBanner4 data', async () => {
    const { result } = renderHook(() => useEditContent('/banner/4/edit'));
    expect(result.current.form.formState.defaultValues).toStrictEqual(EditBanner4.module[0].data);
  });
});
