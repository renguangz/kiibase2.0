import type { ComponentProps, Dispatch, SetStateAction } from 'react';
import type { NextRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';
import getMe from '@/api/v2/get-me';
import { useRouter } from 'next/router';

type AuthConfigType = {
  permission: boolean;
  setPermission: Dispatch<SetStateAction<boolean>>;
  handlePermissionUpdate: () => Promise<Response>;
};

const Context = createContext<AuthConfigType>(null!);

type Props = Omit<ComponentProps<typeof Context.Provider>, 'value'>;

export default function AuthConfig({ children }: Props) {
  const [permission, setPermission] = useState(false);
  const router = useRouter();

  const handlePermissionUpdate = () => httpMeGET(setPermission, router);

  const context = {
    permission,
    setPermission,
    handlePermissionUpdate,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useAuthConfig() {
  return useContext(Context);
}

async function httpMeGET(setPermission: Dispatch<SetStateAction<boolean>>, router: NextRouter) {
  return await getMe({
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
