import type { ComponentProps, Dispatch, SetStateAction } from 'react';
import type { NextRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import getMe from '@/api/v2/get-me';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

type AuthConfigType = {
  permission: boolean;
  setPermission: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<AuthConfigType>(null!);

type Props = Omit<ComponentProps<typeof Context.Provider>, 'value'>;

export default function AuthConfig({ children }: Props) {
  const [permission, setPermission] = useState(false);
  const router = useRouter();

  useEffect(() => {
    httpMeGET(setPermission, router);
  }, []);

  const context = {
    permission,
    setPermission,
  };

  if (!permission) return <Loading />;

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useAuthConfig() {
  return useContext(Context);
}

async function httpMeGET(setPermission: Dispatch<SetStateAction<boolean>>, router: NextRouter) {
  await getMe({
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
