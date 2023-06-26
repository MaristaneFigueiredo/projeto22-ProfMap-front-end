import Header from "../components/Header"
import { styled } from "styled-components"
import Sidebar from "../components/Sidebar"
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom"
import TeachersPage from "./TeachersPage"

// import Map from 'react-map-gl';
// import { BingMap, BingMapConfig  } from 'react-bingmaps';
// import { MapContainer, TileLayer } from 'react-leaflet';

export default function Home() {
  return (
    <>
      {/* <Sidebar /> */}
      {/* <Route path="/teachers" element={<TeachersPage />}></Route> */}

      <Container>
        <Sidebar />
        <Content>
          <Header />
          <Main>
            <Outlet />
          </Main>
        </Content>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  /* background-color: gray ; */
  /* padding-left: 5px;
padding-right: 5px; */
  display: flex;
  flex-direction: row;
`

const Content = styled.div`
  /* height: 100vh; */
  background-color: blue;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* padding-left: 5px; */
  /* padding-right: 5px; */
  /* padding-top: 5px; */
`

const Main = styled.main`
  background-color: #f7f7f7;
  height: 100vh;
  width: 100%;
  padding: 5px;
`
