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

export default function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();

  // const isNotDefaultLayout = useMemo(() => router.asPath === '/auth/login', [router]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        shouldRetryOnError: false,
        fetcher: request,
        // onError: () => router.push('/auth/login'),
      }}
    >
      <LayoutProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
    </SWRConfig>
  );
}
