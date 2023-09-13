import { SPACES } from '@/utils';
import { Typography } from 'antd';
import { FakeDiv, Wrapper } from '../../common';

export type FilterLayoutFieldProps = {
  label?: string;
  children: React.ReactNode;
};

export function FilterLayoutField({ label, children }: FilterLayoutFieldProps) {
  const { Text } = Typography;

  return (
    <Wrapper width="auto">
      {label && <Text>{label}</Text>}
      {label && <FakeDiv width={`${SPACES['space-8']}px`} />}
      {children}
    </Wrapper>
  );
}
