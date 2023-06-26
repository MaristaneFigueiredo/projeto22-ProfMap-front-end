import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { GlobalStyle } from "./assets/styles/GlobalStyled"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignupPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/" element={<Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
