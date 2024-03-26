import cls from "./AuthPage.module.scss";
import { FormEventHandler, useState } from "react";
import Input from "./components/Input.tsx";
import SubmitButton from "./components/SubmitButton.tsx";
import FormError from "./components/FormError.tsx";
import Caption from "./components/Caption.tsx";
import OtherLinks from "./components/OtherLinks.tsx";
import { Link } from "react-router-dom";
import ky, { HTTPError } from "ky";
import { backendUrl } from "../../constants.ts";

export default function CreateAccountPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [aboutSelf, setAboutSelf] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!login.trim()) {
      return setFormError("Введите логин");
    }
    if (!password.trim()) {
      return setFormError("Введите пароль");
    }
    if (!firstName.trim()) {
      return setFormError("Введите имя");
    }
    if (!lastName.trim()) {
      return setFormError("Введите фамилию");
    }
    setFormError("");

    const request = async () => {
      try {
        const request = await ky(`${backendUrl}/auth/create-profile`, {
          method: "post",
          json: {
            login: login.trim(),
            password: password.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            aboutSelf: aboutSelf.trim(),
          },
        });
        const body = await request.json();
        console.log(body);
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
      <form onSubmit={onFormSubmit} className={cls.auth_form}>
        <Caption>Создание профиля</Caption>
        <Input
          placeholder={"Логин"}
          name={"login"}
          id={"login"}
          value={login}
          title={"Введите Ваш логин"}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          placeholder={"Имя"}
          name={"name"}
          id={"name"}
          value={firstName}
          title={"Введите Ваше имя"}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder={"Фамилия"}
          name={"name"}
          id={"name"}
          value={lastName}
          title={"Введите Вашу фамилию"}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          placeholder={"Статус"}
          name={"aboutSelf"}
          id={"aboutSelf"}
          value={aboutSelf}
          title={"Придумайте немного о себе"}
          onChange={(e) => setAboutSelf(e.target.value)}
        />
        <Input
          placeholder={"Пароль"}
          name={"password"}
          id={"password"}
          value={password}
          title={"Введите Ваш пароль"}
          password
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton>Войти</SubmitButton>
        <FormError>{formError}</FormError>
        <OtherLinks>
          <Link title={"Логин, нажите если у Вас уже создан профиль."} to={"/"}>
            Уже создан профиль? Войти
          </Link>
        </OtherLinks>
      </form>
    </div>
  );
}
