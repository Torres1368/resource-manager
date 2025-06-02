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
              <Route path="resource" element={<ListResources />} />
              <Route path="newResource" element={<NewResource />} />
              <Route path="resource/update/:id" element={<UpdateResource />} />

            </Route>
          </Route>
        </Routes >
      </AuthProvider>
    </Router>


  )
}

export default App;
