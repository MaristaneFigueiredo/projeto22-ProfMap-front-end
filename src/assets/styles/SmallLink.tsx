import { styled } from "styled-components"

type SmallLinkProps = {
  textcolor: string
}

const SmallLink = styled.span<SmallLinkProps>`
  font-size: 12px;
  font-weight: 400;
  color: ${({ textcolor }) => textcolor};
  text-decoration: underline;
  cursor: pointer;
`

export default SmallLink
