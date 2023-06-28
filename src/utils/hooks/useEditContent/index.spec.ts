import useSWR from 'swr';
import EditBanner4 from '@/src/mock/db/utils/EditContent/EditBanner4.json';
import CreateBannerFieldsDataApi from '@/src/mock/db/utils/getFields/bannerFieldsApi.json';
import CreateBannerSuccess from '@/src/mock/db/utils/CreateContent/CreateBannerSuccess.json';
import { renderHook } from '@testing-library/react-hooks';
import { useEditContent } from '.';
import { act } from '@testing-library/react';
import * as requestUtils from '../../request';

jest.mock('swr');

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock('../../request');

describe('useEditContent', () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockImplementation((url: string) => ({
      data: url.includes('getFields') ? CreateBannerFieldsDataApi : EditBanner4,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should route to `banner list` page after edit successfully', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue(CreateBannerSuccess);

    const { result } = renderHook(() => useEditContent('/banner/4/edit', '4'));
    await act(async () => {
      await result.current.handleSubmitUpdate();
    });

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/banner/');
  });

  it('should not route to `banner list` page if api response error', async () => {
    (requestUtils.request as jest.Mock).mockResolvedValue({ ...CreateBannerSuccess, status: 400 });

    const { result } = renderHook(() => useEditContent('/banner/4/edit', '4'));
    await act(async () => {
      await result.current.handleSubmitUpdate();
    });

    expect(mockRouterPush).toHaveBeenCalledTimes(0);
  });
});
