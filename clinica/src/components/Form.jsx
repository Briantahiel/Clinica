import { useState } from 'react';
import { Link } from 'react-router-dom';

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
        // Reiniciar los campos del formulario
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
    <div>
      <h2>Formulario de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Enviar</button>
      </form>
    </div>
    <Link to='/login'>Log in</Link>
    </>
  );
};

export default Form;
