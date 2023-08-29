import { FieldProps } from '@/src/utils';
import { useImageUpload } from '@/src/utils/hooks/useImageUpload';
import styled from 'styled-components';

const DisplayImageWrapper = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;
`;

interface ImageUploadFieldProps extends FieldProps<any> {
  folder: string;
}

export function ImageUploadField({ form, name, folder }: ImageUploadFieldProps) {
  const { displayImage, onImageChange } = useImageUpload(folder, form, name);

  return (
    <div>
      <input data-testid="photo-uploader" type="file" name="uploadImageField" onChange={onImageChange} />
      <DisplayImageWrapper>{displayImage && <img src={displayImage} alt="uploadImageField" />}</DisplayImageWrapper>
    </div>
  );
}
