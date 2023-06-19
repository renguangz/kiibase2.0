import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { enhanceFilterField, EnhanceFilterFieldProps } from './enhanceFilterField';
import { StyledButton } from '../common';
import { COLORS } from '@/src/utils';
import Image from 'next/image';
import ChevronUp from '@/public/ChevronUp.svg';

const Wrapper = styled.div`
  background: #fff;
  width: 100%;
  padding: 10px 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLORS.lightGray};
  margin-bottom: 16px;
`;

const Title = styled.h4`
  margin: 0;
  font-family: 'PingFang TC';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #393a3c;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

type FilterType = {
  component: string;
  props: EnhanceFilterFieldProps;
};

export interface FilterFieldProps {
  onSubmit: () => void;
  form: UseFormReturn<any, any>;
  filters: FilterType[];
  deleteButton: () => JSX.Element | null;
}

export function FilterField({ onSubmit, form, filters, deleteButton }: FilterFieldProps) {
  const [showFilters, setShowFilters] = useState(true);

  const filtersAddForm = useMemo(
    () => filters.map((filter) => ({ ...filter, props: { ...filter.props, form } })),
    [filters],
  );

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>查詢</Title>
        <Image
          src={ChevronUp}
          alt="Chevron"
          width={24}
          height={24}
          onClick={() => setShowFilters((show) => !show)}
          style={{ transform: showFilters ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.3s', cursor: 'pointer' }}
        />
      </TitleWrapper>
      {showFilters && (
        <ContentWrapper>
          <div>
            {filtersAddForm.map((filter) => (
              <div key={`enhanceFilter_${Math.random()}`}>{enhanceFilterField(filter.component)(filter.props)}</div>
            ))}
          </div>
          <ButtonsWrapper>
            {deleteButton()}
            <StyledButton type="button" onClick={onSubmit}>
              送出
            </StyledButton>
          </ButtonsWrapper>
        </ContentWrapper>
      )}
    </Wrapper>
  );
}
