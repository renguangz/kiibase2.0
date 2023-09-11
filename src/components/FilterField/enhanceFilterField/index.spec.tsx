import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { enhanceFilterField, EnhanceFilterFieldProps, mapStringToComponent } from '.';
import BannerFields from '@/src/mocks/db/utils/getFields/bannerFields.json';

describe('enhanceFilterField', () => {
  const setup = (component: string, props: EnhanceFilterFieldProps) => render(enhanceFilterField(component)(props));
  const { result } = renderHook(() => useForm());
  const initProps = {
    form: result.current,
    requried: true,
  };

  describe('AutoCompleteField', () => {
    it('should have label', () => {
      const props = {
        ...initProps,
        label: 'test label',
        options: [],
      };
      setup('AutoCompleteComponent', props);

      const label = screen.queryByRole('heading', { name: 'test label' });
      expect(label).toBeInTheDocument();
    });
  });

  describe('InputTextField', () => {
    const props = {
      ...initProps,
      label: 'test input text field label',
      name: 'testInputField',
    };

    it('should have input with labels and name', async () => {
      setup('InputTextComponent', props);
    });
  });
});
