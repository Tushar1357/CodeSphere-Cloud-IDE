import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js"

import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Ide from "./components/Ide.jsx";

const checkLogin = async () => {
  const response = await fetch("http://localhost:3000/validate/cookie", {
    credentials: "include",
    method: "GET",
  });

  const data = await response.json();

  if (data.message !== true) {
    return redirect('/login');
  }

  return null;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: checkLogin
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/code/:instance_name",
    element: <Ide />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}>
      </RouterProvider>
    </Provider>
  </StrictMode>
);
