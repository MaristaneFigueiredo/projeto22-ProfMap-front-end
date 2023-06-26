import { styled } from "styled-components"
import { Link } from "react-router-dom"
import coruja from '../assets/images/coruja.png'

export default function Sidebar() {
    return(
            <div className="bg-lime-600 w-1/6 h-100 py-1">
                <div><img src={coruja} alt="" width="60%"  /></div>
                <ul>
                    
                    <hr />
                        <div>Cadastro</div>
                    <hr />
                        <li><Link to="/professores-cadastro">Professores</Link></li>
                    <hr />
                        <li><Link to="/locais-trabalho-cadastro">Locais de trabalho</Link></li>
                    <hr />
                </ul>
            </div>
    )
}

const MenuBar = styled.nav`
box-sizing: border-box;

height: 100vh;
width: 150px;
/* background-color: #12521a ; */
background: linear-gradient(0deg, rgba(7,36,0,1) 0%, rgba(9,121,24,1) 53%, rgba(12,89,13,1) 100%);
padding: 0;
display: flex;
flex-direction: column;
gap: 10px;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    ul {
        margin: 0;
        padding: 0;
        font-size: 16px;
        list-style-type: none;
        

        div {
            padding-top: 15px;
            padding-bottom: 15px;
            text-align: center;
            font-size: 14px;
            color: #FFF;
        }

        hr {
            margin: 0;
            border-color: #30883b;
            border-width: 0.1px;
        }

        li {
            padding-top: 15px;
            padding-bottom: 15px;
            padding-left: 5px;
            font-size: 13px;
            font-weight: 400;
            cursor: pointer;
            text-decoration: none;

            a {
                color: #FFF;
            }
            
            color: #3d3c3c;
            * {
                text-decoration: none;
            }
            &:hover {
                /* opacity: 0.2; */
                background-color: #3e964a;
                color: #FFF;
            }
            
        }
        hr {
            width: 100%;
            padding: 0;
        }

    }

`