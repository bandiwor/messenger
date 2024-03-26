import { AuthContext, AuthContextType } from "./AuthContext.ts";
import { ReactNode, useCallback, useLayoutEffect, useState } from "react";
import { Cookies } from "react-cookie";
import {
  accessTokenStoreName,
  backendUrl,
  refreshTokenStoreName,
} from "../../constants.ts";
import ky from "ky";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [requiredAuth, setRequiredAuth] = useState<boolean>(false);

  useLayoutEffect(() => {
    const access = new Cookies().get(accessTokenStoreName);
    const refresh = new Cookies().get(refreshTokenStoreName);

    if (access) {
      setLoggedIn(true);
      return;
    }
    if (refresh) {
      const request = async () => {
        try {
          const response = await ky(`${backendUrl}/auth/refresh`, {
            method: "post",
            json: {
              oldRefresh: refresh,
            },
          });
          const body = await response.json<{
            accessToken: string;
            refreshToken: string;
          }>();
          new Cookies().set(accessTokenStoreName, body.accessToken);
          new Cookies().set(refreshTokenStoreName, body.refreshToken);
          return setLoggedIn(true);
        } catch (e) {
          console.error(e);
        }
      };
      void request();
      return;
    }

    new Cookies().remove(refreshTokenStoreName);
    setRequiredAuth(true);
  }, []);

  const getAccess = useCallback<AuthContextType["getAccess"]>(async () => {
    const access = new Cookies().get(accessTokenStoreName);
    const refresh = new Cookies().get(refreshTokenStoreName);

    if (access) {
      return access;
    }
    if (!refresh) {
      setRequiredAuth(true);
      setLoggedIn(false);
    }

    try {
      const response = await ky(`${backendUrl}/auth/refresh`);
      const body = await response.json<{
        accessToken: string;
        refreshToken: string;
      }>();
      setTokens(body.accessToken, body.refreshToken);
    } catch (e) {
      console.error(e);
      return;
    }

    setRequiredAuth(true);
    setLoggedIn(false);
  }, []);

  const setTokens = (access: string, refresh: string) => {
    new Cookies().set(accessTokenStoreName, access);
    new Cookies().set(refreshTokenStoreName, refresh);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        requiredAuth,
        setTokens,
        getAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
