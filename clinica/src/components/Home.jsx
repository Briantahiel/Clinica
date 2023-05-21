
import { useEffect, useState } from "react";
import { useUserContext } from "../assets/Provider/UserProvider";
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
  const [reservedAppointments, setReservedAppointments] = useState([]);
 

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
    const luxonDate = DateTime.fromISO(date);
    return luxonDate.weekday >= 6;
  };

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

  useEffect(() => {
    fetchMedicos();
  }, []);

  const handleSelectMedico = (medico) => {
    setSelectedMedico(medico);
  };

  const handleReservarCita = async () => {
    if (!selectedHora) {
      alert("Seleccione una hora");
      return;
    }
  
    if (isWeekend(selectedFecha)) {
      alert("No se puede reservar en un fin de semana");
      return;
    }
  
    const isAppointmentReserved = await isAppointmentAlreadyReserved();
    if (isAppointmentReserved) {
      alert("Ya hay una cita reservada para este médico en la misma fecha");
      return;
    }
  
    const existingAppointment = reservedAppointments.find(
      (appointment) =>
        appointment.medico_id === selectedMedico.id &&
        appointment.fecha === selectedFecha
    );
    if (existingAppointment) {
      alert("Ya hay una cita reservada para este médico en la misma fecha");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios?email=${loggedInUser.email}`);
  
      if (!response.ok) {
        throw new Error("Error al obtener el ID del paciente");
      }
  
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Paciente no encontrado");
      }
  
      const pacienteID = data[0].id;
      const citaResponse = await fetch("http://localhost:5000/api/citas", {
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
      });
  
      if (!citaResponse.ok) {
        throw new Error("Error al reservar la cita");
      }
  
      alert("Cita reservada exitosamente");
      const newAppointment = {
        medico_id: selectedMedico.id,
        fecha: selectedFecha,
      };
      setReservedAppointments([...reservedAppointments, newAppointment]);
      setSelectedMedico(null);
      setSelectedHora("");
      setSelectedFecha("");
      setMotivo("");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al reservar la cita");
    }
  };
  
  const isAppointmentAlreadyReserved = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/usuarios?email=${loggedInUser.email}`
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener el ID del paciente");
      }
  
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Paciente no encontrado");
      }
  
      const pacienteID = data[0].id;
      const medicoID = selectedMedico.id;
      const citasResponse = await fetch(
        `http://localhost:5000/api/citas?paciente_id=${pacienteID}&fecha=${selectedFecha}&medico_id=${medicoID}`
      );
  
      if (!citasResponse.ok) {
        throw new Error("Error al verificar la cita reservada");
      }
  
      const citasData = await citasResponse.json();
      return citasData.length > 0;
    } catch (error) {
      console.error(error);
      alert("Hubo un error al verificar la cita reservada");
      return false;
    }
  };
  
  return (
    <div>
      <h1>Reservar Cita</h1>
      {loggedInUser && (
        <>
          <h2>Bienvenido, {loggedInUser.name}</h2>
          <div>
            <h3>Seleccione un médico:</h3>
            <ul>
              {medicos.map((medico) => (
                <li key={medico.id}>
                  <button onClick={() => handleSelectMedico(medico)}>
                    {medico.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedMedico && (
            <div>
              <h3>Médico seleccionado: {selectedMedico.nombre}</h3>
              <div>
                <h4>Seleccione una fecha:</h4>
                <input
                  type="date"
                  min={minDate}
                  max={maxDate}
                  value={selectedFecha}
                  onChange={(e) => setSelectedFecha(e.target.value)}
                />
              </div>
              <div>
                <h4>Seleccione una hora:</h4>
                <select
                  value={selectedHora}
                  onChange={(e) => setSelectedHora(e.target.value)}
                >
                  <option value="">Seleccione una hora</option>
                  {disabledTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h4>Motivo de la cita:</h4>
                <input
                  type="text"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                />
              </div>
              <button onClick={handleReservarCita}>Reservar Cita</button>
            </div>
          )}
          <div>
            <h3>Citas reservadas:</h3>
            {reservedAppointments.length > 0 ? (
              <ul>
                {reservedAppointments.map((appointment) => (
                  <li key={appointment.fecha}>
                    Cita con {appointment.medico_id} el {appointment.fecha}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes citas reservadas.</p>
            )}
          </div>
          <div>
            <h3>Citas reservadas:</h3>
              {reservedAppointments.length > 0 ? (
              <ul>
                {reservedAppointments.map((appointment) => (
                  <li key={appointment.id}>
                    Cita con {appointment.medico_id} el {appointment.fecha}
                  </li>
                ))}
              </ul>
                ) : (
                  <p>No tienes citas reservadas.</p>
                )}
          </div>
        </>
      )}
      {!loggedInUser && (
        <p>
          Por favor, <Link to="/login">inicia sesión</Link> para reservar una
          cita.
        </p>
      )}
    </div>
  );
};

export default Home;
