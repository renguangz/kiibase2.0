import { ContentUpdateField } from '@/src/components';
import { AlertModal } from '@/src/components/AlertModal';
import { ContentHeader } from '@/src/components/Content';
import { useEditContent } from '@/src/utils/hooks';
import { useCreateContent } from '@/src/utils/hooks/useCreateContent';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function EditContentPage() {
  const router = useRouter();
  const { asPath, push, query } = router;
  const { editId } = query;

  const newEditId: string = useMemo(() => (Array.isArray(editId) ? editId[0] : editId ?? ''), [editId]);

  const { fieldsData } = useCreateContent(asPath);
  const {
    listPageUrl,
    form,
    data,
    handleOpenConfirmModal,
    openModal,
    setOpenModal,
    deleteContent,
    handleSubmitUpdate,
  } = useEditContent(asPath, newEditId);

  const title = useMemo(() => data?.topic ?? '', [data]);

  return (
    <div>
      <ContentHeader
        text={`${title}修改`}
        button={
          <div>
            <Link href={listPageUrl}>{title}列表</Link>
            <button type="button" onClick={handleOpenConfirmModal}>
              刪除{title}
            </button>
          </div>
        }
      />
      <ContentUpdateField form={form} fields={fieldsData ?? []} />
      <button type="button" onClick={handleSubmitUpdate}>
        確定
      </button>
      {openModal && <AlertModal setModalDisplay={setOpenModal} confirmFunction={deleteContent} />}
    </div>
  );
}
