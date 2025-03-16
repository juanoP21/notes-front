import { useForm } from 'react-hook-form';
import { registerUser} from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      if (result.ok) {
        alert(result.message || 'Registro exitoso');
        navigate('/login');
        
      } else {
        alert(result.message || 'Error al registrarse');
      }
    } catch (err) {
      alert('Error en el registro',err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register('username', { required: true })}
              className="mt-1 p-2 w-full border rounded  bg-gray-100 text-black"
              placeholder="ejemplo@correo.com"
            />
            {errors.email && <span className="text-red-500">Este campo es obligatorio</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="mt-1 p-2 w-full border rounded  bg-gray-100 text-black"
              placeholder="********"
            />
            {errors.password && <span className="text-red-500">Este campo es obligatorio</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
