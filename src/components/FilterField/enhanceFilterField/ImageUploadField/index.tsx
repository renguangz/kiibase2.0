import { useImageUpload } from '@/src/utils/hooks/useImageUpload';
import styled from 'styled-components';

const DisplayImageWrapper = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;
`;

export function ImageUploadField() {
  const { displayImage, onImageChange } = useImageUpload();

  return (
    <div>
      <input data-testid="photo-uploader" type="file" name="uploadImageField" onChange={onImageChange} />
      <DisplayImageWrapper>{displayImage && <img src={displayImage} alt="uploadImageField" />}</DisplayImageWrapper>
    </div>
  );
}
