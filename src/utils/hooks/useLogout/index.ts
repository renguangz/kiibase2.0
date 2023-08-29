import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

export function useLogout() {
  const router = useRouter();
  const { push } = router;

  const { mutate } = useSWRConfig();

  const handleLogout = useCallback(() => {
    Cookies.remove('token');
    router.push('/auth/login');
    mutate('/menuItemNavi');
    mutate('/subMenuNavi');
  }, [Cookies, push, mutate]);

  return {
    handleLogout,
  };
}
