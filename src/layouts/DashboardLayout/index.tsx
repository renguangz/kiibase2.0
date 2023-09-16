import type { ComponentProps } from 'react';
import AuthConfig from '/src/contexts/auth';
import Layout from '@/layouts/layout/layout';

type Props = ComponentProps<typeof Layout>;

export default function DashboardLayout({ children }: Props) {
  return (
    <AuthConfig>
      <Layout>{children}</Layout>
    </AuthConfig>
  );
}
