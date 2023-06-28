import { ContentUpdateField } from '@/src/components';
import { StyledButton } from '@/src/components/common';
import { ContentHeader } from '@/src/components/Content';
import { PageLayout } from '@/src/layouts';
import { COLORS } from '@/src/utils';
import { useCreateContent } from '@/src/utils/hooks/useCreateContent';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export const ConfirmButtonWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
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
    isSubmitButtonDisabled,
    handleSubmit,
  } = useCreateContent(asPath);

  return (
    <PageLayout>
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
        <StyledButton variant="contained" type="button" disabled={isSubmitButtonDisabled} onClick={handleSubmit}>
          確定
        </StyledButton>
      </ConfirmButtonWrapper>
    </PageLayout>
  );
}
