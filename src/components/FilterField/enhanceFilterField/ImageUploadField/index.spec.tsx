import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { ImageUploadField } from '.';
import * as requestUtils from '@/src/utils/request';
import ImageUploadResponse from '@/src/mock/db/utils/uploadFile/uploadImage.json';
import { useForm, UseFormReturn } from 'react-hook-form';

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));
describe('ImageUploadField', () => {
  const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
  const setup = (form: UseFormReturn<any, any>) =>
    render(
      <ImageUploadField defaultValue={''} folder="/testroute" form={form} name="testImageUpload" required={false} />,
    );

  it('should not have image when initial', async () => {
    const { result } = renderHook(() => useForm());
    setup(result.current);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByTestId('photo-uploader-testImageUpload')).toBeInTheDocument();
    expect(screen.queryByTestId('photo-uploader-testImageUpload')).toBeVisible();
  });

  it('should upload photo', async () => {
    const { result } = renderHook(() => useForm());
    setup(result.current);
    global.URL.createObjectURL = jest.fn(() => 'imageURL');
    (requestUtils.request as jest.Mock).mockResolvedValue(ImageUploadResponse);
    const imageInput = screen.getByTestId('photo-uploader-testImageUpload') as HTMLInputElement;
    await waitFor(() => {
      fireEvent.change(imageInput, { target: { files: [file] } });
    });

    await waitFor(async () => {
      const image = screen.queryByRole('img') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image).toBeVisible();
    });
  });
});
