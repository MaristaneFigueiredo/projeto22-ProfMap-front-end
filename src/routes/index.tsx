import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import HomePage from "../pages/HomePage"
import TeachersPage from "../pages/TeachersPage"

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
      // {
      //     path:'professores-locais-trabalho/:idTeacher',
      //     element: <ProfessoresLocaisTrabalhoCadastro />
      // },
      // {
      //     path: "locais-trabalho-cadastro",
      //     element: <LocaisTrabalhoCadastro />,
      // },
    ],
  },
])

export default router
