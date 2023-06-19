// function App() {
//   return <>TESTE</>
// }

// export default App

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { GlobalStyle } from "./assets/styles/GlobalStyled"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
//import Signup from "./pages/Signup"
//import Home from "./pages/Home"

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignupPage />}></Route>
          {/*   <Route path="/home" element={<Home />}></Route> */}
          <Route path="/" element={<Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
