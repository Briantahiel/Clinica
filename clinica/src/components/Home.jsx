// import { useUserContext } from "../assets/Provider/UserProvider";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { DateTime } from 'luxon';

// const Home = () => {
//   const { loggedInUser } = useUserContext();
//   const [medicos, setMedicos] = useState([]);
//   const [selectedMedico, setSelectedMedico] = useState(null);
//   const [selectedHora, setSelectedHora] = useState("");
//   const [selectedFecha, setSelectedFecha] = useState("");
//   const [motivo, setMotivo] = useState("");

//   const [minDate, setMinDate] = useState(null);
//   const [maxDate, setMaxDate] = useState(null);
//   const [disabledTimes, setDisabledTimes] = useState([]);

//   useEffect(() => {
//     const currentDate = DateTime.now();
//     setMinDate(currentDate.toISODate());
//     const maxDate = currentDate.plus({ days: 14 });
//     setMaxDate(maxDate.toISODate());
//     const disabledTimes = [];
//     const startTime = DateTime.fromObject({ hour: 9, minute: 0 });
//     const endTime = DateTime.fromObject({ hour: 18, minute: 30 });
//     let currentTime = startTime;
//     while (currentTime < endTime) {
//       disabledTimes.push(currentTime.toFormat('HH:mm'));
//       currentTime = currentTime.plus({ minutes: 45 });
//     }

//     setDisabledTimes(disabledTimes);
//   }, []);
//   const isWeekend = (date) => {
//     const luxonDate = DateTime.fromISO(date); // Convierte la fecha a un objeto DateTime de Luxon
//     return luxonDate.weekday === 6 || luxonDate.weekday === 7; // 6 representa sábado, 7 representa domingo
//   };
//   const disabledDates = [];
// for (let i = 0; i < 7; i++) {
//   const currentDate = DateTime.now().plus({ days: i });
//   if (isWeekend(currentDate)) {
//     disabledDates.push(currentDate.toISODate());
//   }
// }


//   useEffect(() => {
//     const fetchMedicos = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/medicos");

//         if (response.ok) {
//           const data = await response.json();
//           setMedicos(data);
//         } else {
//           throw new Error("Error al obtener la lista de médicos");
//         }
//       } catch (error) {
//         console.error(error);
//         alert("Hubo un error al obtener la lista de médicos");
//       }
//     };
//     fetchMedicos();
//   }, []);

//   const handleSelectMedico = (medico) => {
//     setSelectedMedico(medico);
//   };

//   const handleReservarCita = () => {
//     if (!selectedHora) {
//       alert("Seleccione una hora");
//       return;
//     }
//     fetch(`http://localhost:5000/api/usuarios?email=${loggedInUser.email}`, {
//       method: "GET",
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Error al obtener el ID del paciente");
//         }
//       })
//       .then((data) => {
//         if (data.length === 0) {
//           throw new Error("Paciente no encontrado");
//         }
//         const pacienteID = data[0].id;
//         fetch("http://localhost:5000/api/citas", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             paciente_id: pacienteID,
//             medico_id: selectedMedico.id,
//             hora: selectedHora,
//             fecha: selectedFecha,
//             motivo: motivo,
//           }),
//         })
//           .then((response) => {
//             if (response.ok) {
//               alert("Cita reservada exitosamente");
//             } else {
//               throw new Error("Error al reservar la cita");
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//             alert("Hubo un error al reservar la cita");
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Hubo un error al obtener el ID del paciente");
//       });
//   };

//   if (!loggedInUser) {
//     return (
//       <div>
//         {/* <p>No has iniciado sesión</p> */}
//         <Link to="/login">Iniciar sesión</Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Perfil de usuario</h2>
//       <h4>Hola {loggedInUser.name}</h4>
//       <div>
//         <h3>Médicos:</h3>
//         <ul>
//           {medicos.map((medico) => (
//             <li key={medico.id} onClick={() => handleSelectMedico(medico)}>
//               {medico.nombre} {medico.apellido}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {selectedMedico && (
//         <div>
//           <h4>
//             Medico seleccionado: {selectedMedico.nombre}{" "}
//             {selectedMedico.apellido}
//           </h4>
//           <div>
//             <label htmlFor="fecha">Fecha:</label>
//             <input
//               type="date"
//               id="fecha"
//               value={selectedFecha}
//               min={minDate}
//               max={maxDate}
//               onChange={(e) => setSelectedFecha(e.target.value)}
//             />
//           </div>
//           <div>
//           <label htmlFor="hora">Hora:</label>
//           <select
//             id="hora"
//             value={selectedHora}
//             onChange={(e) => setSelectedHora(e.target.value)}
//           >
//             <option value="">Seleccionar hora</option>
//             {disabledTimes.map((time) => (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
//         </div>
//           <div>
//             <label htmlFor="motivo">Motivo:</label>
//             <input
//               type="text"
//               id="motivo"
//               value={motivo}
//               onChange={(e) => setMotivo(e.target.value)}
//             />
//           </div>
//           <button onClick={handleReservarCita}>Reservar Cita</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
import { useUserContext } from "../assets/Provider/UserProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from 'luxon';

const Home = () => {
  const { loggedInUser } = useUserContext();
  const [medicos, setMedicos] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [selectedHora, setSelectedHora] = useState("");
  const [selectedFecha, setSelectedFecha] = useState("");
  const [motivo, setMotivo] = useState("");

  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [disabledTimes, setDisabledTimes] = useState([]);

  useEffect(() => {
    const currentDate = DateTime.now();
    setMinDate(currentDate.toISODate());
    const maxDate = currentDate.plus({ days: 14 });
    setMaxDate(maxDate.toISODate());
    const disabledTimes = [];
    const startTime = DateTime.fromObject({ hour: 9, minute: 0 });
    const endTime = DateTime.fromObject({ hour: 18, minute: 30 });
    let currentTime = startTime;
    while (currentTime < endTime) {
      disabledTimes.push(currentTime.toFormat('HH:mm'));
      currentTime = currentTime.plus({ minutes: 45 });
    }

    setDisabledTimes(disabledTimes);
  }, []);

  const isWeekend = (date) => {
    const luxonDate = DateTime.fromISO(date); // Convierte la fecha a un objeto DateTime de Luxon
    return luxonDate.weekday >= 6; // 6 representa sábado y domingo
  };

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicos");

        if (response.ok) {
          const data = await response.json();
          setMedicos(data);
        } else {
          throw new Error("Error al obtener la lista de médicos");
        }
      } catch (error) {
        console.error(error);
        alert("Hubo un error al obtener la lista de médicos");
      }
    };
    fetchMedicos();
  }, []);

  const handleSelectMedico = (medico) => {
    setSelectedMedico(medico);
  };

  const handleReservarCita = () => {
    if (!selectedHora) {
      alert("Seleccione una hora");
      return;
    }
  
    if (isWeekend(selectedFecha)) {
      alert("No se puede reservar en un fin de semana");
      return;
    }
  
    fetch(`http://localhost:5000/api/usuarios?email=${loggedInUser.email}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener el ID del paciente");
        }
      })
      .then((data) => {
        if (data.length === 0) {
          throw new Error("Paciente no encontrado");
        }
        const pacienteID = data[0].id;
        fetch("http://localhost:5000/api/citas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paciente_id: pacienteID,
            medico_id: selectedMedico.id,
            hora: selectedHora,
            fecha: selectedFecha,
            motivo: motivo,
          }),
        })
          .then((response) => {
            if (response.ok) {
              alert("Cita reservada exitosamente");
            } else {
              throw new Error("Error al reservar la cita");
            }
          })
          .catch((error) => {
            console.error(error);
            alert("Hubo un error al reservar la cita");
          });
      })
      .catch((error) => {
        console.error(error);
        alert("Hubo un error al obtener el ID del paciente");
      });
  };
  

  if (!loggedInUser) {
    return (
      <div>
        {/* <p>No has iniciado sesión</p> */}
        <Link to="/login">Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Perfil de usuario</h2>
      <h4>Hola {loggedInUser.name}</h4>
      <div>
        <h3>Médicos:</h3>
        <ul>
          {medicos.map((medico) => (
            <li key={medico.id} onClick={() => handleSelectMedico(medico)}>
              {medico.nombre}
            </li>
          ))}
        </ul>
      </div>
      {selectedMedico && (
        <div>
          <h3>Seleccionar fecha:</h3>
          <input
            type="date"
            min={minDate}
            max={maxDate}
            onChange={(e) => setSelectedFecha(e.target.value)}
          />
          <h3>Seleccionar hora:</h3>
          <select
            value={selectedHora}
            onChange={(e) => setSelectedHora(e.target.value)}
          >
            <option value="">Seleccione una hora</option>
            {disabledTimes.map((time) => (
              <option key={time} value={time} disabled={isWeekend(selectedFecha)}>
                {time}
              </option>
            ))}
          </select>
          <h3>Motivo:</h3>
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
          <button onClick={handleReservarCita}>Reservar cita</button>
        </div>
      )}
    </div>
  );
};

export default Home;
