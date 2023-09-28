import { COLORS, FieldProps } from '@/utils';
import { useImageUpload } from '@/hooks/useImageUpload';
import styled from 'styled-components';
import { Toast } from 'primereact/toast';

const DisplayImageWrapper = styled.div`
  background: #fff;
  border: 1px solid ${COLORS.lightGray};
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DisplayImg = styled.img`
  object-fit: civer;
  max-width: 100%;
  max-height: 100%;
`;

interface ImageUploadFieldProps extends FieldProps<any> {
  folder: string;
  url?: string;
}

export function ImageUploadField({ form, name, folder, url }: ImageUploadFieldProps) {
  const { toast, displayImage, onImageChange } = useImageUpload(folder, form, name, url);

  return (
    <div>
      <Toast ref={toast} />
      <input
        {...form.register(name, {
          validate: {},
        })}
        data-testid={`photo-uploader-${name}`}
        type="file"
        name="uploadImageField"
        onChange={onImageChange}
      />
      <DisplayImageWrapper>
        {displayImage && <DisplayImg src={displayImage} alt="uploadImageField" />}
      </DisplayImageWrapper>
    </div>
  );
}
