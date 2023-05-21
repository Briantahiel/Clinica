
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../assets/Provider/UserProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();

  const { login } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,

        }),
      });
      if (response.status === 200) {
        // login({email})
        const { name, email } = await response.json();
        login({ email, name });
        // alert('Inicio de sesión exitoso');
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 800
        })
        navigate('/');
      } else if (response.status === 401) {
        // throw new Error('Credenciales inválidas');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales inválidas!',
        })
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al iniciar sesión');
    }
  };

  return (
    <>
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
    <Link to='/form'>Registrate</Link>
    </>
  );
};

export default Login;
