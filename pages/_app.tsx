import { DefaultLayout } from '@/src/layouts';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { SWRConfig } from 'swr';
import { request } from '@/src/utils/request';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        shouldRetryOnError: false,
        fetcher: request,
        onError: () => router.push('/auth/login'),
      }}
    >
      <DefaultLayout>
        <Component {...pageProps} key={router.asPath} />
      </DefaultLayout>
    </SWRConfig>
  );
}
