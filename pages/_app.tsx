import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import '@/styles/global.css';
import { SWRConfig } from 'swr';
import MSWConfig from '@/contexts/msw';
import AuthContext from '@/contexts/auth';
import { request } from '@/utils/request';
import { RwdConfig } from '@/contexts/rwd-config';
import Layout from '@/layouts/layout/layout';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/styles/layout/layout.scss';
import '@/styles/demo/Demos.scss';
import { useRouter } from 'next/router';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const DashboardLayout = (page: ReactElement) => (
    <AuthContext>
      <RwdConfig>
        <Layout>{page}</Layout>
      </RwdConfig>
    </AuthContext>
  );

  const getLayout = Component.getLayout ?? DashboardLayout;

  return (
    <SWRConfig value={generateSWRConfig(router)}>
      <MSWConfig>{getLayout(<Component {...pageProps} />)}</MSWConfig>
    </SWRConfig>
  );
}

function generateSWRConfig(router: ReturnType<typeof useRouter>) {
  return {
    refreshInterval: 0,
    shouldRetryOnError: false,
    fetcher: request,
    onError: (error: any) => {
      error === 'Unauthorized' ? router.push('/auth/login') : router.push('/');
    },
  };
}
