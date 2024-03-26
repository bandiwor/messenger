import cls from "./GeneralWrapper.module.scss";
import { ReactNode } from "react";
import Header from "../header/Header.tsx";
import useAuthContext from "../../state/auth/useAuthContext.ts";
import AuthWrapper from "./AuthWrapper.tsx";

export default function GeneralWrapper({ children }: { children: ReactNode }) {
  const authContext = useAuthContext();

  return (
    <div className={cls.page}>
      {authContext.loggedIn && (
        <>
          <Header />
          <main className={cls.main}>{children}</main>
        </>
      )}
      {authContext.requiredAuth && <AuthWrapper />}
    </div>
  );
}
