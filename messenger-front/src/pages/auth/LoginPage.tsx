import cls from "./AuthPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FormEventHandler, useState } from "react";
import ky, { HTTPError } from "ky";
import { backendUrl } from "../../constants.ts";
import Caption from "./components/Caption.tsx";
import Input from "./components/Input.tsx";
import SubmitButton from "./components/SubmitButton.tsx";
import FormError from "./components/FormError.tsx";
import OtherLinks from "./components/OtherLinks.tsx";
import useAuthContext from "../../state/auth/useAuthContext.ts";

export default function LoginPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!login.trim()) {
      return setFormError("Введите логин");
    }
    if (!password.trim()) {
      return setFormError("Введите пароль");
    }
    setFormError("");

    const request = async () => {
      try {
        const response = await ky(`${backendUrl}/auth/login`, {
          method: "post",
          json: {
            login: login.trim(),
            password: password.trim(),
          },
        });
        const body = await response.json<{
          ok: boolean;
          profileCreated: boolean;
          accessToken?: string;
          refreshToken?: string;
        }>();
        if (!body.profileCreated) {
          return navigate("/create-account");
        }
        if (body.accessToken && body.refreshToken) {
          authContext.setTokens(body.accessToken, body.refreshToken);
        }
        navigate("/");
      } catch (e) {
        if (e instanceof HTTPError) {
          const data = await e.response.json();
          setFormError(data.message ?? "Unknown error");
        }
      }
    };

    void request();
  };

  return (
    <div className={cls.auth}>
      <form className={cls.auth_form} onSubmit={onFormSubmit}>
        <Caption>Вход</Caption>
        <Input
          placeholder={"Логин"}
          name={"login"}
          title={"Введите Ваш логин"}
          id={"login"}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          placeholder={"Пароль"}
          name={"password"}
          title={"Введите Ваш пароль"}
          id={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton>Войти</SubmitButton>
        <FormError>{formError}</FormError>
        <OtherLinks>
          <Link
            to={"/register"}
            title={"Впервые здесь? Нажмите для регистрации"}
          >
            Впервые здесь?
          </Link>
        </OtherLinks>
      </form>
    </div>
  );
}
