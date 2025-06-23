import { useAuth } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";

const RrhhRoute = () => {
  const { user, userRoles, loading } = useAuth();

  // Mostrar loader mientras se carga la sesión y los roles
  if (loading) {
    return (
      <h1>cargando</h1>
    );
  }

  // Si no hay sesión activa, redirige al login
  if (!user) return <Navigate to="/login" />;

  // Si no es del team RRHH, redirige a "no autorizado"
  if (!userRoles.isRRHH) return <Navigate to="/unauthorized" />;

  // Si todo está bien, renderiza las rutas hijas
  return <Outlet />;
};

export default RrhhRoute;
