
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../assets/Provider/UserProvider';
import Swal from 'sweetalert2';
import "../Login.css"
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
        const { nombre, email, paciente_id } = await response.json();
        login({ nombre, email, paciente_id });

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
    <div className='container-login'>
    <div className='container-form'>
    <form onSubmit={handleSubmit}>
    <h2 style={{ textAlign: 'center' }}>Iniciar sesión</h2>
    <div className='container-email' style={{ marginBottom: '15px' }}>
      <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: '100%', padding: '5px' }}
      />
    </div>
    <div className='container-password' style={{ marginBottom: '15px' }}>
      <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: '100%', padding: '5px' }}
      />
    </div>
    <button type="submit" className='btn-login' style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Iniciar sesión</button>
   <h6 style={{ textAlign: 'center', marginTop: '10px' }}>¿No tienes cuenta? <Link to='/form' style={{ color: 'blue', textDecoration: 'underline' }}>Registrate</Link></h6>
  </form>
  </div>
</div>
    </> 
  );
};

export default Login;
