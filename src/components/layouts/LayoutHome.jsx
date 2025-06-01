import Welcome from "@/pages/Welcome";
import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";
const LayoutHome=()=>{
    return (
         <>
        <NavBar/>
        <Outlet />
        </>
    )
}

export default LayoutHome;