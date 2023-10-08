import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { useAuthConfig } from '/src/contexts/auth';
import Layout from '@/layouts/layout/layout';
import Loading from '/src/components/Loading';

type Props = ComponentProps<typeof Layout>;

export default function DashboardLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const { permission, handlePermissionUpdate } = useAuthConfig();

  useEffect(() => {
    handlePermissionUpdate().then((response) => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return <>{permission && <Layout>{children}</Layout>}</>;
}
