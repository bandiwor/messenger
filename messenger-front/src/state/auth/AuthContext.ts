import { createContext } from "react";

export type AuthContextType = {
  loggedIn: boolean;
  requiredAuth: boolean;
  setTokens: (access: string, refresh: string) => void;
  getAccess: () => Promise<string | undefined>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
