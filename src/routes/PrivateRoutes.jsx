import { useAuth } from "@/context/AuthContext";
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const {user} = useAuth()
        return user ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoutes;