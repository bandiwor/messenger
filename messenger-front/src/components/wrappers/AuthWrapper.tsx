import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/auth/LoginPage.tsx";
import RegisterPage from "../../pages/auth/RegisterPage.tsx";
import CreateAccountPage from "../../pages/auth/CreateAccountPage.tsx";

export default function AuthWrapper() {
  return (
    <Routes>
      <Route path={"/register"} element={<RegisterPage />} />
      <Route path={"/create-account"} element={<CreateAccountPage />} />
      <Route path={"*"} element={<LoginPage />} />
    </Routes>
  );
}
