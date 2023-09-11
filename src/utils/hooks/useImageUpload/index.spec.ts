import { renderHook } from '@testing-library/react';
import { useImageUpload } from '.';
import * as requestUtils from '@/src/utils/request';
import { act } from '@testing-library/react-hooks';
import UploadImageData from '@/src/mocks/db/utils/uploadFile/uploadImage.json';
import { useForm } from 'react-hook-form';

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));

describe('useImageUplaod', () => {
  const { result: formResult } = renderHook(() => useForm());

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call upload file POST api after uploading image', async () => {
    global.URL.createObjectURL = jest.fn(() => 'imageURL');
    (requestUtils.request as jest.Mock).mockResolvedValue(UploadImageData);
    const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
    const { result } = renderHook(() => useImageUpload('/banner', formResult.current, 'pic'));
    await act(async () => {
      await result.current.onImageChange({ target: { files: [file] } });
    });

    const body = new FormData();
    body.append('file', file);
    body.append('folder', '/banner');

    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    expect(requestUtils.request).toHaveBeenCalledWith(
      '/model/banner/upload/file',
      {
        method: 'POST',
        body,
      },
      true,
    );
  });

  it('should call upload file POST api with content name `testroute` in folder column', async () => {
    global.URL.createObjectURL = jest.fn(() => 'imageURL');
    (requestUtils.request as jest.Mock).mockResolvedValue(UploadImageData);
    const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
    const { result } = renderHook(() => useImageUpload('/testroute', formResult.current, 'pic'));
    await act(async () => {
      await result.current.onImageChange({ target: { files: [file] } });
    });

    const body = new FormData();
    body.append('file', file);
    body.append('folder', '/testroute');

    expect(requestUtils.request).toHaveBeenCalledTimes(1);
    expect(requestUtils.request).toHaveBeenCalledWith(
      '/model/testroute/upload/file',
      {
        method: 'POST',
        body,
      },
      true,
    );
  });

  it('should set form value to response filename with name passed in', async () => {
    const { result: formResult } = renderHook(() => useForm());
    const form = formResult.current;
    global.URL.createObjectURL = jest.fn(() => 'imageURL');
    (requestUtils.request as jest.Mock).mockResolvedValue(UploadImageData);
    const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
    const { result } = renderHook(() => useImageUpload('testroute', form, 'testUploadPhotoName'));
    await act(async () => {
      await result.current.onImageChange({ target: { files: [file] } });
    });

    expect(form.watch()).toStrictEqual({ testUploadPhotoName: UploadImageData.data.filePath });
  });
});
