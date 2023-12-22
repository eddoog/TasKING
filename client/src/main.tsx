import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import { GlobalProvider } from "./context/GlobalProvider.tsx"
import "./index.css"
import Login from "./Login.tsx"
import NotFound from "./NotFound.tsx"
import Register from "./Register.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} fallbackElement={<NotFound />} />{" "}
    </GlobalProvider>
  </React.StrictMode>
)
