import { useEffect, useState } from "react";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";

export const useAuthSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [attributes, setAttributes] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        const attrs = await fetchUserAttributes();

        setUser(currentUser);
        setAttributes(attrs);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setAttributes(null);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isCheckingAuth,
    user,
    attributes,
  };
};