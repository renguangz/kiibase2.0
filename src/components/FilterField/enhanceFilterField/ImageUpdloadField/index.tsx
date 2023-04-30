import { FileUpload } from 'primereact/fileupload';
import { ReactElement, JSXElementConstructor, ReactFragment } from 'react';

export function ImageUploadField() {
  return (
    <div>
      <FileUpload
        multiple={false}
        accept="image/*"
        url="ai/upload"
        maxFileSize={1000000}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        headerTemplate={headerTemplate}
      />
    </div>
  );
}

const emptyTemplate = () => {
  return (
    <div className="flex align-items-center flex-column">
      <i
        className="pi pi-image mt-3 p-5"
        style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}
      ></i>
      <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
        Drag and Drop Image Here
      </span>
    </div>
  );
};

const headerTemplate = () => {
  return (
    <div>
      <button type="button">上傳圖片</button>
    </div>
  );
};

const itemTemplate = (file: {
  name:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | null
    | undefined;
  objectURL: string | undefined;
}) => {
  return (
    <div className="flex align-items-center flex-wrap">
      <div className="flex align-items-center" style={{ width: '40%' }}>
        <img alt={''} role="presentation" src={file.objectURL} width={100} />
        <span className="flex flex-column text-left ml-3">
          {file.name}
          <small>{new Date().toLocaleDateString()}</small>
        </span>
      </div>
    </div>
  );
};
