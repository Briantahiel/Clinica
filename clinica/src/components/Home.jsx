
import { useEffect, useState } from "react";
import { useUserContext } from "../assets/Provider/UserProvider";
// import { Link } from "react-router-dom";
// import { DateTime } from 'luxon';

const Home = (citaId) => {
  const { loggedInUser } = useUserContext();
  const [cita, setCita] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const response = await fetch(`http://localhost:5000}/api/citas/${citaId}`);
        if (response.ok) {
          const data = await response.json();
          setCita(data);
        } else {
          throw new Error('Error al obtener los datos de la cita');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCita();
  }, [citaId]);
  

  return (
    <>
    <div>
      <h1>Reservar Cita</h1>
      {loggedInUser &&
        <h2>Bienvenido, {loggedInUser.nombre}</h2>
      }
    </div>
    <div>
      <h2>Detalles de la cita</h2>
      {cita ? (
        <div>
          <p>Fecha: {cita.fecha}</p>
          <p>Hora: {cita.hora}</p>
          <p>Motivo: {cita.motivo}</p>
        </div>
      ) : (
        <p>Cargando detalles de la cita...</p>
      )}
    </div>
    </>
  );
};

export default Home;