import { useState } from 'react';

const MedicoForm = () => {
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [dni, setDni] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('especialidad', especialidad);
      formData.append('dni', dni);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('descripcion', descripcion);
      formData.append('imagen', imagen);

      const response = await fetch('http://localhost:5000/api/medicos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Médico agregado exitosamente');
        // Reiniciar los campos del formulario
        setNombre('');
        setEspecialidad('');
        setDni('');
        setUsername('');
        setPassword('');
        setDescripcion('');
        setImagen(null);
      } else {
        throw new Error('Error al agregar el médico');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al agregar el médico');
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  return (
    <div>
      <h2>Formulario de Médico</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="especialidad">Especialidad:</label>
          <input
            type="text"
            id="especialidad"
            name="especialidad"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImagenChange}
            required
          />
        </div>
        <button type="submit">Agregar Médico</button>
      </form>
    </div>
  );
};

export default MedicoForm;
