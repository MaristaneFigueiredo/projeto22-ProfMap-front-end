import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { screenAuthColor } from "../constants/colors"
import logo from "../assets/images/coruja.png"
import TitleLevel2 from "../assets/styles/TitleLevel2"
import Input from "../assets/styles/Input"
import StyledButton from "../assets/styles/Button"
import SmallLink from "../assets/styles/SmallLink"
import SmallText from "../assets/styles/SmallText"

export default function LoginPage() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const navigate = useNavigate()

  async function signin() {
    try {
      // console.log(
      //   "process.env.REACT_APP_API_BASEURL",
      //   process.env.REACT_APP_API_BASEURL
      // )
      await axios
        .post(`${process.env.REACT_APP_API_BASEURL}/users/sign-in`, {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data)
          localStorage.setItem("profmap-token", response.data)
          setEmail("")
          setPassword("")
          navigate("/")
        })
        .catch(() => {
          alert("Não autorizado!")
        })
    } catch (error) {
      alert("E-mail já ca")
    }
  }

  return (
    <>
      <Screen>
        <Containner>
          <img src={logo} alt="logo" width="200px" />
          <TitleLevel2 textcolor="#7F7F7F">Criar uma nova conta</TitleLevel2>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              signin()
            }}
          >
            <Input
              sizeinput="100%"
              placeholder="E-mail"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Input
              sizeinput="100%"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <StyledButton heightx="50px" textsize="17px">
              Entrar
            </StyledButton>
            <SmallLink textcolor="#7F7F7F">Esqueci minha senha</SmallLink>
            <SmallText textcolor="#7F7F7F">
              Não tem conta?
              <Link to="/sign-up">
                <SmallLink textcolor="#7F7F7F">Cadastre-se</SmallLink>
              </Link>
            </SmallText>
          </Form>
        </Containner>
      </Screen>
    </>
  )
}
const Screen = styled.div`
  background-color: ${screenAuthColor};
  height: 100vh;
  width: 100vw;
`
const Containner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 50px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
