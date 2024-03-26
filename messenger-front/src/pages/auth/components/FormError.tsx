import cls from "../AuthPage.module.scss";
import { ReactNode } from "react";

export default function FormError({ children }: { children: ReactNode }) {
  return <div className={cls.form_error}>{children}</div>;
}
