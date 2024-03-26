import cls from "../AuthPage.module.scss";
import { ReactNode } from "react";

export default function OtherLinks({ children }: { children: ReactNode }) {
  return <div className={cls.other}>{children}</div>;
}
