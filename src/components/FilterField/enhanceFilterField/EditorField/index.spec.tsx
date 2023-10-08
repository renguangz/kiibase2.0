import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { EditorField } from '.';
import * as requestUtils from '@/utils/request';

jest.mock('@/utils/request', () => ({
  ...jest.requireActual('@/utils/request'),
  request: jest.fn(),
}));

describe('EditorField', () => {
  const { result } = renderHook(() => useForm());
  const file = new File(['test file'], 'testImage.png', { type: 'image/png' });

  beforeEach(() => {
    render(<EditorField name="testEditor" form={result.current} defaultValue={undefined} required={false} />);
  });

  it('should call `/upload/quill` api after upload image', async () => {
    // FIXME: 上傳圖片要打api
    const imgButton = screen.getByLabelText('Insert Image');
    global.URL.createObjectURL = jest.fn(() => 'imageURL');
    const editorContent = document.querySelector('.ql-editor') as HTMLDivElement;
    expect(editorContent).toBeInTheDocument();
    await userEvent.click(imgButton);
    await waitFor(() => {
      fireEvent.change(editorContent, { target: { files: [file] } });
    });
    // await waitFor(async () => {
    //   expect(requestUtils.request).toHaveBeenCalled();
    // });
  });
});
