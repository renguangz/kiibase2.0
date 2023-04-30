import { render, screen } from '@testing-library/react';
import { ImageUploadField } from '.';

describe('ImageUploadField', () => {
  beforeEach(() => render(<ImageUploadField />));
  it('should show empty template', () => {
    const empty = screen.queryByText('Drag and Drop Image Here');
    expect(empty).toBeInTheDocument();
  });
});
