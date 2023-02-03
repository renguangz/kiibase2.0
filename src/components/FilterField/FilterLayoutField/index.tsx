import { SPACES } from '@/src/utils';
import { Typography } from 'antd';
import { FakeDiv, Wrapper } from '../../common';

export type FilterLayoutFieldProps = {
  label?: string;
  children: React.ReactNode;
};

export function FilterLayoutField({ label, children }: FilterLayoutFieldProps) {
  return (
    <Wrapper>
      {label && <Typography>{label}</Typography>}
      {label && <FakeDiv width={`${SPACES['space-8']}px`} />}
      {children}
    </Wrapper>
  );
}
