import cls from "../AuthPage.module.scss";
import { ReactNode } from "react";

export default function Caption({ children }: { children: ReactNode }) {
  return <h1 className={cls.caption}>{children}</h1>;
}
