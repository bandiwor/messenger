import cls from "../AuthPage.module.scss";
import { ReactNode } from "react";

export default function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button type="submit" className={cls.button}>
      {children}
    </button>
  );
}
