import { styled } from "styled-components"

type SmallTextProps = {
  textcolor: string
}

const SmallText = styled.span<SmallTextProps>`
  font-size: 12px;
  font-weight: 400;
  color: ${({ textcolor }) => textcolor};
`

export default SmallText
