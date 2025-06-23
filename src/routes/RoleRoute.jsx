import { useAuth } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";

const RoleRoute = ({ requiredRole }) => {
  const { user, userRoles, loading } = useAuth();

  if (loading) {
    return (
        <h1>cargando</h1>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (!userRoles[requiredRole]) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default RoleRoute;
