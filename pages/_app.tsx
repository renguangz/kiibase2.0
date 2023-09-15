import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Meta from '@/components/Meta';
import ResourceBase from '/resources/base.json';
import { SWRConfig } from 'swr';
import { RwdConfig } from '@/contexts/rwd-config';
import MSWConfig from '@/contexts/msw';
import AuthContext from '@/contexts/auth';
import { request } from '@/utils/request';
import Layout from '@/layouts/layout/layout';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import '@/styles/theme-primereact/themes/fluent/fluent-light/theme.scss';
import '@/styles/globals.css';
import '@/styles/layout/layout.scss';

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
    <>
      <SWRConfig value={generateSWRConfig(router)}>
        <MSWConfig>{getLayout(<Component {...pageProps} />)}</MSWConfig>
      </SWRConfig>
      <Meta {...ResourceBase} />
    </>
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
