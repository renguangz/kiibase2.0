import type { ReactElement } from 'react';
import { ContentUpdateField } from '@/components';
import { StyledButton } from '@/components/common';
import { ContentHeader } from '@/components/Content';
import { PageLayout } from '@/layouts';
import { COLORS } from '@/utils';
import { useCreateContent } from '@/hooks/useCreateContent';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Message } from 'primereact/message';
import DashboardLayout from '@/layouts/DashboardLayout';

export const ConfirmButtonWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
`;

interface MessageWrapperProps {
  shouldDisplay: boolean;
}

export const MessageWrapper = styled.div<MessageWrapperProps>`
  position: fixed;
  z-index: 4;
  top: 70px;
  display: ${(props) => (props.shouldDisplay ? 'flex' : 'none')};
  justify-content: center;
`;

export const StyledLink = styled.span`
  color: ${COLORS.primary};
`;

export default function CreateContentPage() {
  const router = useRouter();
  const { asPath } = router;

  const {
    data: createConfigData,
    form,
    fieldsData,
    listPageUrl,
    handleSubmit,
    requiredImageUploadFieldsAreEmpty,
    createResponseMessage,
  } = useCreateContent(asPath);

  return (
    <PageLayout>
      <MessageWrapper shouldDisplay={createResponseMessage !== null}>
        {createResponseMessage && (
          <Message severity={createResponseMessage.type} text={createResponseMessage.message} />
        )}
      </MessageWrapper>
      <ContentHeader
        text={`${createConfigData?.topic ?? ''}建立`}
        button={
          <StyledButton type="button" variant="outline" onClick={() => router.push(`/${listPageUrl}`)}>
            <StyledLink>{createConfigData?.topic}列表</StyledLink>
          </StyledButton>
        }
      />
      <ContentUpdateField form={form} fields={fieldsData ?? []} />
      <ConfirmButtonWrapper>
        <StyledButton
          variant="contained"
          type="button"
          disabled={!form.formState.isValid || requiredImageUploadFieldsAreEmpty}
          onClick={handleSubmit}
        >
          確定
        </StyledButton>
      </ConfirmButtonWrapper>
    </PageLayout>
  );
}

CreateContentPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
