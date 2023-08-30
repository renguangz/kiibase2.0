import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { replace } = router;

  useEffect(() => {
    replace('/adminUser');
  }, []);
  console.log('test');
  return (
    <div>
      <Head>
        <title>後台系統</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
