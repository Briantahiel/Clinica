import { useEffect, useState } from "react";
import { useUserContext } from "../assets/Provider/UserProvider";
import Medicos from "./Medicos";
import "../App.css"
import "../Home.css"
import "../Citas.css"
import Servicios from "./Servicios";

const Home = () => {
  const { loggedInUser } = useUserContext();
  const [citas, setCitas] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/citas/${loggedInUser.paciente_id}`);
        if (response.ok) {
          const data = await response.json();
          setCitas(data);
        } else {
          throw new Error('Error al obtener los datos de la cita');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCitas();
      const interval = setInterval(fetchCitas, 1000);
    return () => clearInterval(interval);
  }, [loggedInUser, setCitas]);

  const handleCancelarCita = async (citaId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/citas/${citaId}/${loggedInUser.paciente_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== citaId));
        alert('Cita cancelada exitosamente');
      } else {
        throw new Error('Error al cancelar la cita');
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("citas reservadas", citas)
  function formatHour(time) {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }
  return (
    <> 
      <div id="carouselExampleFade" className="carousel carousel-container slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./img/banner4.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption">
              <div className="text">
                <h1 className="mb-4">Al cuidado de tu salud dental.</h1>                
                <p>Sonríe sin preocupaciones. Cuidamos de tu salud dental con servicios profesionales y personalizados.</p>
              </div>
          </div>
          </div>
          <div className="carousel-item">
            <img src="./img/banner2.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./img/banner6.jpg" className="d-block w-100" alt="..." />
          </div>
      </div>  
      </div>
      <div className="home-user">
        {loggedInUser ? <h4>Bienvenido {loggedInUser.nombre}</h4> : null}
      </div>
      <Medicos />
      <div className="citas-title">
        <h4>Detalles de las citas</h4>
      </div>
      <div className="citas-container">
        {loggedInUser ? (
          <>
            {citas && citas.length > 0 ? (
              citas.map((cita) => (
                <div key={cita.id} >
                  <div className="container-citas">
                    <div className="container-info">
                      <p className="cita-info__item">Fecha: {new Date(cita.fecha).toLocaleDateString()}</p>
                      <p className="cita-info__item">Hora: {formatHour(cita.hora)}</p>
                      <p className="cita-info__item">Médico: {cita.nombre_medico}</p>
                      <button className="cancelar-cita-btn" onClick={() => handleCancelarCita(cita.id)}>
                        Cancelar Cita
                      </button>
                    </div>  
                  </div>                 
                </div>
              ))
            ) : (
              <p className="sin-citas">No tienes citas</p>
            )}
          </>
        ) : (
          null
        )}
      </div>
     <Servicios />
    </>
  );  
};

export default Home;
