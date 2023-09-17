import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { useAuthConfig } from '/src/contexts/auth';
import Layout from '@/layouts/layout/layout';
import Loading from '/src/components/Loading';

type Props = ComponentProps<typeof Layout>;

export default function DashboardLayout({ children }: Props) {
  const { permission, handlePermissionUpdate } = useAuthConfig();

  useEffect(() => {
    handlePermissionUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!permission) return <Loading />;

  return <Layout>{children}</Layout>;
}
