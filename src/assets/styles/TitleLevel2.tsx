import { styled } from "styled-components"

type TitleLevel2Props = {
  textcolor: string
}

const TitleLevel2 = styled.h1<TitleLevel2Props>`
  font-size: 18px;
  font-weight: 400;
  color: ${({ textcolor }) => textcolor};
`

export default TitleLevel2
