import { useEffect } from 'react';
import { subscribeAuthState, fetchIdToken } from '../api/authService';
import { attachAuthHeader } from '../api/axiosInstance';
import { useAuthStore } from '../app/store/authStore';

export default function useAuthStatus() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const unsubscribe = subscribeAuthState(async (user) => {
      if (!user) {
        clearAuth();
        attachAuthHeader(null);
        return;
      }

      const token = await fetchIdToken();
      attachAuthHeader(token);
      setUser({ uid: user.uid, email: user.email });
    });

    return () => unsubscribe();
  }, [clearAuth, setUser]);
}
