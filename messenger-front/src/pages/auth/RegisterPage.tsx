import cls from "./AuthPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FormEventHandler, useState } from "react";
import ky, { HTTPError } from "ky";
import { backendUrl } from "../../constants.ts";
import Input from "./components/Input.tsx";
import SubmitButton from "./components/SubmitButton.tsx";
import FormError from "./components/FormError.tsx";
import Caption from "./components/Caption.tsx";
import OtherLinks from "./components/OtherLinks.tsx";

export default function RegisterPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const navigate = useNavigate();

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!login.trim()) {
      return setFormError("Придумайте уникальный логин");
    }
    if (!password.trim()) {
      return setFormError("Введите надёжный пароль");
    }
    if (!passwordConfirm.trim()) {
      return setFormError("Повторите пароль");
    }
    if (!(password.trim() === passwordConfirm.trim())) {
      return setFormError("Пароли не совпадают");
    }
    setFormError("");

    const request = async () => {
      try {
        const response = await ky(`${backendUrl}/auth/register`, {
          method: "post",
          json: {
            login: login.trim(),
            password: password.trim(),
          },
        });
        const body = await response.json<{ ok: boolean }>();
        if (body.ok) {
          navigate("/create-account");
        }
      } catch (e) {
        if (e instanceof HTTPError) {
          setFormError((await e.response.json()).message ?? "Unknown error");
        }
      }
    };

    void request();
  };

  return (
    <div className={cls.auth}>
      <form className={cls.auth_form} onSubmit={onFormSubmit}>
        <Caption>Регистрация</Caption>
        <Input
          placeholder={"Логин"}
          name={"login"}
          id={"login"}
          aria-autocomplete={"none"}
          title={"Придумайте логин"}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          placeholder={"Пароль"}
          name={"password"}
          id={"password"}
          title={"Придумайте пароль"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder={"Повторите пароль"}
          name={"passwordConfirm"}
          id={"passwordConfirm"}
          title={"Повторите пароль"}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <SubmitButton>Войти</SubmitButton>
        <FormError>{formError}</FormError>
        <OtherLinks>
          <Link to={"/login"} title={"Уже есть аккаунт? Нажмите для входа"}>
            Уже есть аккаунт?
          </Link>
        </OtherLinks>
      </form>
    </div>
  );
}
