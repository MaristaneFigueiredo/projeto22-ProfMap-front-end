import { styled } from "styled-components"

type InputProps = {
  sizeinput: string
}

const Input = styled.input<InputProps>`
  border-radius: 10px;
  padding: 15px 15px;
  padding-left: 30px;
  outline: none;
  border: none;
  box-shadow: 0 2px 7px #9e9c9c;
  width: ${({ sizeinput }) => sizeinput};
`

export default Input
