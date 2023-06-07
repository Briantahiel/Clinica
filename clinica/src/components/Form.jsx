import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../FormUser.css"
const Form= () => {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dni,
          nombre,
          apellido,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        setDni('');
        setNombre('');
        setApellido('');
        setEmail('');
        setPassword('');
      } else {
        throw new Error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <>
    <div className='container-form_user'>
    <div className='container-form_form'>
    <form onSubmit={handleSubmit}>
     <h2>Registro</h2>
      <div className='container-dni' style={{ marginBottom: '10px', textAlign: 'left' }}>
        <label htmlFor="dni">DNI:</label>
        <br />
        <input
          type="text"
          id="dni"
          name="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div className='container-nombre' style={{ marginBottom: '10px', textAlign: 'left' }}>
        <label htmlFor="nombre">Nombre:</label>
        <br />
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div className='container-apellido' style={{ marginBottom: '10px', textAlign: 'left' }}>
        <label htmlFor="apellido">Apellido:</label>
        <br />
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div className='container-email' style={{ marginBottom: '10px', textAlign: 'left' }}>
        <label htmlFor="email">Email:</label>
        <br />
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
      <div className='container-password' style={{ marginBottom: '10px', textAlign: 'left' }}>
        <label htmlFor="password">Contraseña:</label>
        <br />
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
      <button type="submit" className='btn-enviar' style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Enviar</button>
    </form>
    <h6 style={{ textAlign: 'center', marginTop: '10px' }}>¿Ya tienes cuenta? <Link to='/login' style={{ color: 'blue', textDecoration: 'underline' }}>Iniciar sesión</Link></h6>
  </div>
</div>
    </>
  );
};

export default Form;
