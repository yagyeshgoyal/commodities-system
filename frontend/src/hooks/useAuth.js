import { useStore } from '../context/StoreContext';

export const useAuth = () => {
  const { user, token, loading, isAuthenticated, login, logout, hasRole, hasAnyRole } = useStore();

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasAnyRole,
  };
};

export default useAuth;