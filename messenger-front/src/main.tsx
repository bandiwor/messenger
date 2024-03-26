import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import AppLoader from "./AppLoader.tsx";

const App = lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*<AppLoader />*/}
    <Suspense fallback={<AppLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
);
