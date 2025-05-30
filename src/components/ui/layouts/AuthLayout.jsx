import { Login } from "@/pages/auth/Login";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

const AuthLayout=()=>{
    return (
        <Login></Login>
    )
}
export default AuthLayout;