import cls from "../wrappers/GeneralWrapper.module.scss";
import { HeaderLinkDataList } from "../../types.ts";
import HeaderLinkItem from "./HeaderLinkItem.tsx";
import { useState } from "react";
import OpenedIcon from "../../assets/menu-opened.svg";
import ClosedIcon from "../../assets/menu-closed.svg";

const links: HeaderLinkDataList = [
  { label: "Чаты", href: "/", id: 2 },
  { label: "Аккаунт", href: "/profile", id: 3 },
  { label: "Помощь", href: "/help", id: 5 },
];

export default function Header() {
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const toggleMenu = () => setMenuToggled((prev) => !prev);

  return (
    <header className={cls.header}>
      <div className={cls.logo}>Messenger</div>
      <nav className={`${cls.nav} ${menuToggled ? cls.toggle : ""}`}>
        <ul className={cls.links}>
          {links.map((item) => (
            <HeaderLinkItem key={item.id} {...item} />
          ))}
        </ul>
      </nav>
      <button className={cls.toggleButton} onClick={toggleMenu}>
        <img
          className={cls.icon}
          src={menuToggled ? OpenedIcon : ClosedIcon}
          alt="toggle"
        />
      </button>
    </header>
  );
}
