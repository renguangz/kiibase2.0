import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ImageUploadField } from '.';
import * as requestUtils from '@/src/utils/request';

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));
describe('ImageUploadField', () => {
  const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
  beforeEach(() => render(<ImageUploadField />));

  it('should not have image when initial', async () => {
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByTestId('photo-uploader')).toBeInTheDocument();
    expect(screen.queryByTestId('photo-uploader')).toBeVisible();
  });

  it('should upload photo', async () => {
    global.URL.createObjectURL = jest.fn(() => 'imageURL');
    (requestUtils.request as jest.Mock).mockResolvedValue({
      status: 200,
    });
    const imageInput = screen.getByTestId('photo-uploader') as HTMLInputElement;
    await waitFor(() => {
      fireEvent.change(imageInput, { target: { files: [file] } });

      const image = screen.queryByRole('img') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image).toBeVisible();
    });
  });
});
