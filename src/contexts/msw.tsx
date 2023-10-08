import type { ComponentProps } from 'react';
import { createContext, useState, useEffect } from 'react';

const MSWContext = createContext('');

type Props = Omit<ComponentProps<typeof MSWContext.Provider>, 'value'>;

export default function MSWConfig({ children }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_APP_MOCK === 'true') {
      // worker.start() is asynchronous,
      // so use condition render to make user API call after mocks server ready.
      import('@/mocks/browser').then(({ worker }) => worker.start()).then(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, []);

  return <MSWContext.Provider value={''}>{loaded ? children : <></>}</MSWContext.Provider>;
}
