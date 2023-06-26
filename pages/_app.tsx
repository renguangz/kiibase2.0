import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { request } from '@/src/utils/request';
import { LayoutProvider } from '@/src/layouts/layout/context/layoutcontext';
import Layout from '@/src/layouts/layout/layout';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/styles/layout/layout.scss';
import '@/styles/demo/Demos.scss';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AuthLayout } from '@/src/layouts/AuthLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isAuthLayout = useMemo(() => router.asPath.includes('/auth'), [router]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        shouldRetryOnError: false,
        fetcher: request,
        onError: (error) => {
          if (error === 'Unauthorized') {
            router.push('/auth/login');
          } else {
            router.push('/');
          }
        },
      }}
    >
      {isAuthLayout ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <LayoutProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutProvider>
      )}
    </SWRConfig>
  );
}
