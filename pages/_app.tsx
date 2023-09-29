import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Meta from '@/components/Meta';
import ResourceBase from '/resources/base.json';
import { SWRConfig } from 'swr';
import AuthConfig from '/src/contexts/auth';
import RwdConfig from '@/contexts/rwd-config';
import MSWConfig from '@/contexts/msw';

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

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <AuthConfig>
        <RwdConfig>
          <SWRConfig value={generateSWRConfig(router)}>
            <MSWConfig>{getLayout(<Component key={router.asPath} {...pageProps} />)}</MSWConfig>
          </SWRConfig>
        </RwdConfig>
      </AuthConfig>
      <Meta {...ResourceBase} />
    </>
  );
}

import { request } from '@/utils/request';
function generateSWRConfig(router: ReturnType<typeof useRouter>) {
  return {
    refreshInterval: 0,
    shouldRetryOnError: false,
    fetcher: request,
    onError: (error: any) => {
      if (router.asPath.includes('/demo') || router.asPath === '/doc') return;
      error === 'Unauthorized' ? router.push('/auth/login') : router.push('/');
    },
  };
}
