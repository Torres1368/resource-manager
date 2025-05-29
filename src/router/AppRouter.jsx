import {  Routes ,Route, Navigate} from "react-router"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"

export const AppRouter=()=>{
    return (
        <Routes>
            <Route path="/login"  element={<Login/>}/>
            <Route path="/home" element={<Home/>}/> 
            <Route path="/*" element={<Navigate to="/home" />}/>
        </Routes>
    )
}