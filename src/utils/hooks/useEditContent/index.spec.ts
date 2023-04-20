import useSWR from 'swr';
import EditBanner4 from '@/src/mock/db/utils/EditContent/EditBanner4.json';
import { renderHook } from '@testing-library/react-hooks';
import { useEditContent } from '.';
import * as fetchMock from '../../fetch';

jest.mock('swr');
jest.mock('../../fetch');

describe('useEditContent', () => {
  (useSWR as jest.Mock).mockImplementation((url: string) => ({
    data: EditBanner4,
  }));

  it('should return EditBanner4 if url is `banner/4/edit`', async () => {
    const { result } = renderHook(() => useEditContent('/banner/4/edit'));
    expect(result.current.data).toStrictEqual(EditBanner4);
    expect(useSWR).toHaveBeenCalledWith(expect.stringContaining('banner/4/edit'), fetchMock.fetchData);
  });

  it('should have form with default value EditBanner4 data', async () => {
    const { result } = renderHook(() => useEditContent('/banner/4/edit'));
    expect(result.current.form.formState.defaultValues).toStrictEqual(EditBanner4.module[0].data);
  });
});
