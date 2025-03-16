import { Route, Routes } from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/Register";
import Dasboard from "../pages/Dasboard";
import { validartoken } from "../services/api";

const isAuthenticated = validartoken(localStorage.getItem("token"));

const RoterDom = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={isAuthenticated ? <Dasboard /> : <Navigate to="/login" />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
};
export default RoterDom;
