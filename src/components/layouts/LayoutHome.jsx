import Welcome from "@/pages/Welcome";
import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const LayoutHome=()=>{
    return (
         <>
        <NavBar/>
        <Outlet />
        <Footer/>
        </>
    )
}

export default LayoutHome;