import type { ComponentProps } from 'react';
import Layout from '@/layouts/layout/layout';

type Props = ComponentProps<typeof Layout>;

export default function DashboardLayout({children}: Props) {
  return <Layout>{children}</Layout>
}
