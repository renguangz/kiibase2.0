import { DefaultLayout } from '@/src/layouts';
import { useLogin } from '@/src/utils/hooks';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { SWRConfig } from 'swr';
import { request } from '@/src/utils/request';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { hasLoginTokenInCookie } = useLogin();

  useEffect(() => {
    if (!hasLoginTokenInCookie) router.push('/auth/login');
  }, [hasLoginTokenInCookie, router]);
  return (
    <SWRConfig value={{ refreshInterval: 0, fetcher: request }}>
      <DefaultLayout>
        <Component {...pageProps} key={router.asPath} />
      </DefaultLayout>
    </SWRConfig>
  );
}
