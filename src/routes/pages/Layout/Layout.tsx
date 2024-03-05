import { Outlet } from "react-router-dom";
import Footer from "../../../common/components/Footer";
import NavBar from "../../../common/components/NavBar";
import Header from "../../../common/components/Header";
import { MainBody } from "./Layout.styled";

const Layout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <MainBody>
        <Outlet />
      </MainBody>
      <Footer />
    </>
  )
};

export default Layout;