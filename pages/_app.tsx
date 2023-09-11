import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import '@/styles/global.css';
import { SWRConfig } from 'swr';
import MSWConfig from '/src/contexts/msw';
import { request } from '@/src/utils/request';
import { RwdConfig } from '@/src/contexts/rwd-config';
import Layout from '@/src/layouts/layout/layout';
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
  const DefaultLayout = (page: ReactElement) => (
    <RwdConfig>
      <Layout>{page}</Layout>
    </RwdConfig>
  );

  const getLayout = Component.getLayout ?? DefaultLayout;

  return (
    <SWRConfig value={generateSWRConfig(router)}>
      <MSWConfig>{getLayout(<Component key={router.asPath} {...pageProps} />)}</MSWConfig>
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
