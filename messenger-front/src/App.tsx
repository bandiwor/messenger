import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index/IndexPage.tsx";
import GeneralWrapper from "./components/wrappers/GeneralWrapper.tsx";
import AuthProvider from "./state/auth/AuthProvider.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GeneralWrapper>
          <Routes>
            <Route path={""} element={<IndexPage />} />
          </Routes>
        </GeneralWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}
