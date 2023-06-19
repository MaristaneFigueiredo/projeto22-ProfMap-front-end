import { styled } from "styled-components"
import { buttonColor } from "../../constants/colors"

type StyledButtonProps = {
  heightx: string
  textsize: string
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${buttonColor};
  border-radius: 50px;
  height: ${({ heightx }) => heightx};
  border: none;
  cursor: pointer;
  font-size: ${({ textsize }) => textsize};
  font-weight: 100;
  color: #fff;
  box-shadow: 0 2px 7px #9e9c9c;
  width: 100%;
`

export default StyledButton
