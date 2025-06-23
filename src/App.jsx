import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes";

import Register from "./pages/auth/register";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import LayoutHome from "./components/layouts/LayoutHome";
import Welcome from "./pages/Welcome";
import ListResources from "./pages/resources/ListResources";
import NewResource from "./pages/resources/NewResource";
import UpdateResource from "./pages/resources/updateResource";
import RrhhRoute from "./routes/RrhhRoutes";
import Message from "./pages/rrhh/message";
import Unauthorized from "./pages/auth/Unauthorized";
import RoleRoute from "./routes/RoleRoute";
import Figura from "./pages/designs/Box3D";
import Wolf3D from "./pages/designs/wolf3D";





function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/figure" element={<Figura />} />
          <Route path="/wolf" element={<Wolf3D />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<LayoutHome />}>
              <Route index element={<Navigate to="welcome" replace />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="resource" element={<ListResources />} />
              <Route path="newResource" element={<NewResource />} />

              <Route path="resource/update/:id" element={<UpdateResource />} />
            </Route>
          </Route>

          {/* Rutas protegidas solo para usuarios del team RRHH  este lo cree con 
          RrhhRoutes pero preferible usar el roleRoute para varios roles*/}
          <Route element={<RrhhRoute />}>
            
          </Route>

          {/* Rutas con role route para usar un jsx para todos los roles en mi caso!!! 
          recordar que debo agregar en auth context en el useState y rolesToCheck */}
          <Route element={<RoleRoute requiredRole="isRRHH" />}>
            <Route path="message" element={<Message />} />
          </Route>


        </Routes >
      </AuthProvider>
    </Router>


  )
}

export default App;
