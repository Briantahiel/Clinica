import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../assets/Provider/UserProvider";
import '../App.css'

const Medicos = () => {
  const { loggedInUser } = useUserContext();
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicos");
        if (response.ok) {
          const data = await response.json();
          setMedicos(data);
        } else {
          throw new Error("Error al obtener los médicos");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicos();
  }, []);

  const convertBufferToDataURL = (buffer) => {
    const base64String = btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return `data:image/jpeg;base64,${base64String}`;
  };
  const reserva = () => {
    alert("reserva")
  }
  return (
    <>
      <div className="container-medicos" style={{ maxWidth: '1200px', margin: '0 auto'}}>
  <h4>Listado de Médicos</h4>
  <div className="container-cards" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
    {medicos && medicos.length > 0 ? (
      medicos.map((medico) => (
        <div className="card" key={medico.dni} style={{ width: '18rem', margin: '10px', padding: '0' }}>
          <img src={convertBufferToDataURL(medico.imagen.data)} className="card-img-top" alt="..." style={{ width: '100%', height: '100%' }} />
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h5 className="card-title">{medico.nombre}: {medico.especialidad}.</h5>
            <p className="list-group-item" style={{ height: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{medico.descripcion}.</p>
            <div className="card-footer" style={{ marginTop: 'auto' }}>
              {loggedInUser ? (<button onClick={reserva}>Reserva</button>) : (<Link to='/login'>Reserva</Link>)}
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No hay médicos disponibles</p>
    )}
  </div>
</div>


    </>  
);
};

export default Medicos;

