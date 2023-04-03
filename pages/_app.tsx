import { DefaultLayout } from '@/src/layouts';
import { useLogin } from '@/src/utils/hooks';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { hasLoginTokenInCookie } = useLogin();

  useEffect(() => {
    if (!hasLoginTokenInCookie) router.push('/auth/login');
  }, [hasLoginTokenInCookie, router]);
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
