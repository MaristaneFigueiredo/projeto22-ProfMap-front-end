import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { styled } from "styled-components"
import axios from "axios"
import logo from "../assets/images/coruja.png"
import { screenAuthColor } from "../constants/colors"
import TitleLevel2 from "../assets/styles/TitleLevel2"
import Input from "../assets/styles/Input"
import StyledButton from "../assets/styles/Button"
import SmallLink from "../assets/styles/SmallLink"
import SmallText from "../assets/styles/SmallText"

export default function SignupPage() {
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  async function signup() {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_BASEURL}/users/sign-up`, {
          name,
          email,
          password,
        })
        .then(() => {
          setName("")
          setEmail("")
          setPassword("")
          alert("Usuário cadastrado com sucesso!")
        })
        .catch((response) => {
          alert("Já existe usuário com este e-mail!")
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
              signup()
            }}
          >
            <Input
              sizeinput="100%"
              placeholder="Nome completo"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
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
              value={password}
              placeholder="Senha"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <StyledButton heightx="50px" textsize="17px">
              Entrar
            </StyledButton>
            <SmallLink textcolor="#7F7F7F">Esqueci minha senha</SmallLink>
            <SmallText textcolor="#7F7F7F">
              Já tem conta?
              <Link to="/login">
                <SmallLink textcolor="#7F7F7F">Faça login</SmallLink>
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
