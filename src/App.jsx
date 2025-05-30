import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes";


import Register from "./pages/auth/register";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import Login from "./pages/auth/Login";
import Profile from "./components/ui/layouts/profile";



function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>

      </Routes > 
      </AuthProvider>
    </Router>


  )
}

export default App;
