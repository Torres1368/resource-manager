import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes";

import Register from "./pages/auth/register";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import LayoutHome from "./components/layouts/LayoutHome";
import Welcome from "./pages/Welcome";



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<LayoutHome />}>
              <Route index element={<Navigate to="welcome" replace />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="recursos" element={<div>Recursos Técnicos</div>} />
            </Route>
          </Route>
        </Routes >
      </AuthProvider>
    </Router>


  )
}

export default App;
