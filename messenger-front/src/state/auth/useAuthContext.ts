import { useContext } from "react";
import { AuthContext } from "./AuthContext.ts";

export default function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("No AuthContext.");
  }

  return ctx;
}
