import { renderHook } from '@testing-library/react';
import { useImageUpload } from '.';
import * as requestUtils from '@/src/utils/request';

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));

describe('useImageUplaod', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call upload file POST api after uploading image', async () => {
    global.URL.createObjectURL = jest.fn(() => 'imageURL');
    (requestUtils.request as jest.Mock).mockResolvedValue({
      status: 200,
    });
    const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
    const { result } = renderHook(() => useImageUpload());
    result.current.onImageChange({ target: { files: [file] } });

    const body = new FormData();
    body.append('file', file);
    body.append('folder', 'banner');

    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    expect(requestUtils.request).toHaveBeenCalledWith(
      '/upload/file',
      {
        method: 'POST',
        body,
      },
      true,
    );
  });
});
