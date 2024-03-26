import { useLayoutEffect, useState } from "react";
import ky, { HTTPError, Options } from "ky";
import useAuthContext from "../state/auth/useAuthContext.ts";

// type Options<T> = {
//   method: string;
//   json: T;
// };

export default function useRequest<TResponse = unknown>(
  url: string,
  options?: Options | null,
  useAuth?: boolean,
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string | string[] }>();
  const [response, setResponse] = useState<TResponse>();
  const authContext = useAuthContext();

  useLayoutEffect(() => {
    const request = async () => {
      try {
        const response = await ky(
          url,
          {
            ...options,
            headers: useAuth
              ? {
                  authorization: `Bearer ${await authContext.getAccess()}`,
                }
              : void 0,
          } ?? void 0,
        );

        const json = await response.json<TResponse>();
        setResponse(json);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof HTTPError) {
          const data = await e.response.json();
          setError({ message: data.message });
        }
        setError({ message: "unknown" });
        setIsLoading(false);
      }
    };

    void request();
  }, []);

  return { isLoading, error, response };
}
