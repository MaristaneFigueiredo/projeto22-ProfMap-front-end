import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import HomePage from "../pages/HomePage"
import TeachersPage from "../pages/TeachersPage"
import WorkspacesPage from "../pages/WorkspacesPage"
import TeachersWorkplacesPage from "../pages/TeachersWorkplacesPage"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "professores-cadastro",
        element: <TeachersPage />,
      },
      {
        path: "professores-locais-trabalho/:idTeacher",
        element: <TeachersWorkplacesPage />,
      },
      {
        path: "locais-trabalho-cadastro",
        element: <WorkspacesPage />,
      },
    ],
  },
])

export default router
