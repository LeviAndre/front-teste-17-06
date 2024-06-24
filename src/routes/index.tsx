import { createBrowserRouter } from "react-router-dom"
import TicketPage from "../pages/ticket/TicketPage";
import AuthPage from "../pages/auth/AuthPage";
import RegisterPage from "../pages/register/RegisterPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <TicketPage />,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ])

export default router;