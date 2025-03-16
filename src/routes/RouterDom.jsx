import { Route, Routes } from "react-router-dom";

import Login from "../pages/login";

const RoterDom = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/dasboard" element={} />
      <Route path="/register" element={} />
    </Routes>
  );
};
export default RoterDom;
