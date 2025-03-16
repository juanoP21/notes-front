import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {loginUser}  from "../services/api.js";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const result = await loginUser(data);
      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      } else {
        alert(result.message || "Credenciales inválidas");
      }
    } catch (err) {
      alert("Error al iniciar sesión", err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="mt-1 p-2 w-full border rounded bg-gray-100 text-black"
              placeholder="ejemplo@correo.com"
            />
            {errors.email && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="mt-1 p-2 w-full border rounded bg-gray-100 text-black"
              placeholder="********"
            />
            {errors.password && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
