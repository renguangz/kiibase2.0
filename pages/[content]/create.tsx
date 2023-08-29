import { ContentUpdateField } from '@/src/components';
import { StyledButton } from '@/src/components/common';
import { ContentHeader } from '@/src/components/Content';
import { PageLayout } from '@/src/layouts';
import { COLORS } from '@/src/utils';
import { useCreateContent } from '@/src/utils/hooks/useCreateContent';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Message } from 'primereact/message';

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

export const StyledLink = styled(Link)`
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
          <StyledButton type="button" variant="outline">
            <StyledLink href={`/${listPageUrl}`}>{createConfigData?.topic}列表</StyledLink>
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
