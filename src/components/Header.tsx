import { styled } from "styled-components"
import SmallText from "../assets/styles/SmallText"

export default function Header() {
  return (
    <Cabecalho>
      <div>Usuário: </div>
      <div>E-mail: </div>
    </Cabecalho>
  )
}

const Cabecalho = styled.div`
  background-color: #979696;
  width: 100%;
  padding: 5px;
  height: 50px;
  box-shadow: 5px 5px 20px #979696;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
`
