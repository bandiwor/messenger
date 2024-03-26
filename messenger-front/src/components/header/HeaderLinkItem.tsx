import { HeaderLinkData } from "../../types.ts";
import cls from "../wrappers/GeneralWrapper.module.scss";
import { Link } from "react-router-dom";

export default function HeaderLinkItem(props: HeaderLinkData) {
  return (
    <li className={cls.link}>
      <Link className={cls.a} to={props.href}>
        {props.label}
      </Link>
    </li>
  );
}
