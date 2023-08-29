import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useLogout() {
  const router = useRouter();
  const { push } = router;

  const handleLogout = useCallback(() => {
    Cookies.remove('token');
    router.push('/auth/login');
  }, [Cookies, push]);

  return {
    handleLogout,
  };
}
