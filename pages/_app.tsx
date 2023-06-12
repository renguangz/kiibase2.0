import { DefaultLayout } from '@/src/layouts';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { SWRConfig } from 'swr';
import { request } from '@/src/utils/request';
import { useMemo } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isNotDefaultLayout = useMemo(() => router.asPath === '/auth/login', [router]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        shouldRetryOnError: false,
        fetcher: request,
        // onError: () => router.push('/auth/login'),
      }}
    >
      {isNotDefaultLayout ? (
        <Component {...pageProps} key={router.asPath} />
      ) : (
        <DefaultLayout>
          <Component {...pageProps} key={router.asPath} />
        </DefaultLayout>
      )}
    </SWRConfig>
  );
}
