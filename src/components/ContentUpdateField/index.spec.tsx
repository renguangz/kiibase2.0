import { render, renderHook, screen } from '@testing-library/react';
import { ContentUpdateField } from '.';
import BannerFields from '@/src/mock/db/utils/getFields/bannerFields';
import { useForm } from 'react-hook-form';

describe('ContentUpdateField', () => {
  describe('Banner', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useForm());
      render(<ContentUpdateField form={result.current} fields={BannerFields} />);
    });
    it('should have five labels with expected labels', () => {
      const labels = screen.queryAllByRole('heading').filter((label) => label.innerHTML !== '目前還沒有這個元件');
      expect(labels).toHaveLength(5);

      const expectedLabels = ['標題', '封面圖', '所在位置', '狀態', '權重'];
      labels.forEach((label, index) => {
        expect(label.innerHTML).toBe(expectedLabels[index]);
      });
    });
  });
});
