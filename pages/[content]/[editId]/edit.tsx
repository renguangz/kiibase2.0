import type { ReactElement } from 'react';
import { ContentUpdateField } from '@/components';
import { StyledButton } from '@/components/common';
import { ContentHeader } from '@/components/Content';
import { PageLayout } from '@/layouts';
import { useEditContent } from '@/hooks';
import { useRouter } from 'next/router';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Message } from 'primereact/message';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ConfirmButtonWrapper, MessageWrapper, StyledLink } from '../create';
import DashboardLayout from '@/layouts/DashboardLayout';

const ContentHeaderButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export default function EditContentPage() {
  const router = useRouter();
  const { asPath, query } = router;
  const { editId } = query;

  const newEditId: string = useMemo(() => (Array.isArray(editId) ? editId[0] : editId ?? ''), [editId]);

  const {
    listPageUrl,
    fieldsData,
    form,
    data,
    deleteContent,
    handleSubmitUpdate,
    requiredImageUploadFieldsAreEmpty,
    editResponseMessage,
  } = useEditContent(asPath, newEditId);

  const title = useMemo(() => data?.topic ?? '', [data]);

  const confirm = () => {
    confirmDialog({
      header: '確定要刪除嗎',
      acceptClassName: 'p-button-danger',
      rejectLabel: '取消',
      acceptLabel: '確定刪除',
      accept: () => deleteContent(),
    });
  };

  return (
    <PageLayout>
      <MessageWrapper shouldDisplay={editResponseMessage !== null}>
        {editResponseMessage && <Message severity={editResponseMessage.type} text={editResponseMessage.message} />}
      </MessageWrapper>
      <ConfirmDialog />
      <ContentHeader
        text={`${title}修改`}
        button={
          <ContentHeaderButtonsWrapper>
            {data?.is_single_data ? null : (
              <StyledButton onClick={() => router.push(listPageUrl)} type="button" variant="outline">
                <StyledLink>{title}列表</StyledLink>
              </StyledButton>
            )}
            {data?.delete_button && (
              <StyledButton type="button" variant="contained" color="danger" onClick={confirm}>
                刪除{title}
              </StyledButton>
            )}
          </ContentHeaderButtonsWrapper>
        }
      />
      <ContentUpdateField form={form} fields={fieldsData ?? []} />
      <ConfirmButtonWrapper>
        <StyledButton
          variant="contained"
          type="button"
          disabled={!form.formState.isValid || requiredImageUploadFieldsAreEmpty}
          onClick={handleSubmitUpdate}
        >
          確定
        </StyledButton>
      </ConfirmButtonWrapper>
    </PageLayout>
  );
}

EditContentPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
