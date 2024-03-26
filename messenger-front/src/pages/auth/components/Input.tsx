import cls from "../AuthPage.module.scss";
import React, { useState } from "react";
import EyeIcon from "../../../assets/eye.svg";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    password?: boolean;
  },
) {
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);

  if (props.password) {
    return (
      <div className={cls.wrapper}>
        <input
          className={cls.input}
          type={passwordHidden ? "password" : "text"}
          {...props}
        />
        <img
          className={cls.show_password_icon}
          src={EyeIcon}
          alt="show"
          title={"Посмотреть пароль"}
          onClick={() => setPasswordHidden((p) => !p)}
        />
      </div>
    );
  }
  return <input className={cls.input} type="text" {...props} />;
}
