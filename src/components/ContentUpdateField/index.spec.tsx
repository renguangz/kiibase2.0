import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { ContentUpdateField } from '.';
import BannerFields from '@/src/mock/db/utils/getFields/bannerFields.json';
import ImageUploadResponse from '@/src/mock/db/utils/uploadFile/uploadImage.json';
import { useForm } from 'react-hook-form';
import { pipe } from 'fp-ts/lib/function';
import { formatSelectData, mapNameToComponent } from '@/src/utils/hooks/useCreateContent';
import * as requestUtils from '@/src/utils/request';
import { act } from 'react-dom/test-utils';

jest.mock('@/src/utils/request');

describe('ContentUpdateField', () => {
  describe('Banner', () => {
    const setup = () => {
      const fieldsData = pipe(BannerFields, mapNameToComponent, formatSelectData);
      const { result } = renderHook(() => useForm());
      render(<ContentUpdateField form={result.current} fields={fieldsData} />);
      return { form: result.current };
    };

    it('should have five labels with expected labels', () => {
      setup();
      const labels = screen.queryAllByRole('heading').filter((label) => label.innerHTML !== '目前還沒有這個元件');
      expect(labels).toHaveLength(5);

      const expectedLabels = ['標題', '封面圖', '所在位置', '狀態', '權重'];
      labels.forEach((label, index) => {
        expect(label.innerHTML).toBe(expectedLabels[index]);
      });
    });

    it('should call api then change form after upload image', async () => {
      global.URL.createObjectURL = jest.fn(() => 'imageURL');
      (requestUtils.request as jest.Mock).mockResolvedValue(ImageUploadResponse);
      const { form } = setup();
      const file = new File(['test file'], 'testImage.png', { type: 'image/png' });

      const imageUpload = screen.getByTestId('photo-uploader');
      await waitFor(() => {
        fireEvent.change(imageUpload, { target: { files: [file] } });
      });

      // @LOOK: 要用這個方式測試，form 才會吃到新的直
      await act(async () => {});

      await waitFor(async () => {
        expect(form.control._formValues['pic']).toEqual('testimageresponse');
      });
    });
  });
});
