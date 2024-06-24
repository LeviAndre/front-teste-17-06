import { createBrowserRouter } from "react-router-dom"
import TicketPage from "../pages/ticket-list/TicketPage";
import AuthPage from "../pages/auth/AuthPage";
import RegisterPage from "../pages/register/RegisterPage";
import TicketCreatePage from "../pages/ticket-create/TicketCreatePage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <TicketPage />,
    },
    {
      path: "/create-ticket",
      element: <TicketCreatePage />,
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