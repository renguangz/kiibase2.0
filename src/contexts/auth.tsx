import type { ComponentProps, Dispatch, SetStateAction } from 'react';
import type { NextRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import getNavItem from '@/api/v2/get-navi-item';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

const Context = createContext<string>(null!);

type Props = Omit<ComponentProps<typeof Context.Provider>, 'value'>;

export default function AuthConfig({ children }: Props) {
  const [permission, setPermission] = useState(false);
  const router = useRouter();

  useEffect(() => {
    httpNaviItemGET(setPermission, router);
  }, []);

  const context = '';

  if (!permission) return <Loading />;

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

async function httpNaviItemGET(setPermission: Dispatch<SetStateAction<boolean>>, router: NextRouter) {
  await getNavItem({
    successCallback: (response, request) => {
      setPermission(true);
    },
    errorCallback: (response, request) => {
      setPermission(false);
      router.push('/auth/login');
    },
    exceptionCallback: (error) => {
      setPermission(false);
      router.push('/auth/login');
    },
  });
}
