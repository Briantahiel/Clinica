import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../assets/Provider/UserProvider";
import { addDays, isWeekend, setHours, setMinutes, setSeconds, format, addMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css'
import '../Medicos.css'
const Medicos = () => {
  const { loggedInUser } = useUserContext();
  const [medicos, setMedicos] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});
  const [selectedMotivos, setSelectedMotivos] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState({});

  useEffect(() => {
    const today = new Date();
    const maxDate = addDays(today, 20);
    const dates = [];

    let currentDate = today;
    while (currentDate <= maxDate) {
      if (!isWeekend(currentDate)) {
        dates.push(currentDate);
      }
      currentDate = addDays(currentDate, 1);
    }

    setAvailableDates(dates);
  }, []);

  const generateTimeSlots = () => {
    const timeSlots = [];
    const startDate = setHours(setMinutes(setSeconds(new Date(), 0), 0), 9);
    const endDate = setHours(setMinutes(setSeconds(new Date(), 0), 0), 18);

    let currentTime = startDate;
    while (currentTime <= endDate) {
      timeSlots.push(currentTime);
      currentTime = addMinutes(currentTime, 45);
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

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
        ""
      )
    );
    return `data:image/jpeg;base64,${base64String}`;
  };
  
  const verificarCitasPaciente = async (medicoId, fechaSeleccionada, pacienteId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/citas/${pacienteId}`);
      if (response.ok) {
        const citas = await response.json();
        const citaExistente = citas.find(
          (cita) =>
            cita.medico_id === medicoId &&
            format(new Date(cita.fecha), "yyyy-MM-dd") === format(fechaSeleccionada, "yyyy-MM-dd")
        );
  
        if (citaExistente) {
          alert("Ya tienes una cita programada con el mismo médico para este día.");
          return false;
        }
  
        return true;
      } else if (response.status === 404) {
        return true; // El paciente no tiene citas previas
      } else {
        throw new Error("Error al obtener las citas del paciente");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  const Reserva = async (medicoId) => {
    try {
      const pacienteId = loggedInUser.paciente_id;
      const fechaSeleccionada = selectedDates[medicoId];
  
      // Verificar si el paciente ya tiene una cita programada para la fecha seleccionada
      const citasVerificadas = await verificarCitasPaciente(medicoId, fechaSeleccionada, pacienteId);
      if (!citasVerificadas) {
        return;
      }
  
      const cita = {
        paciente_id: pacienteId,
        medico_id: medicoId,
        fecha: fechaSeleccionada.toISOString().split("T")[0],
        hora: selectedTimes[medicoId],
        motivo: selectedMotivos[medicoId] || "Consulta",
      };
  
      // Verificar si ya existe una cita para el mismo día y médico con el mismo paciente_id
      const existingCitasResponse = await fetch("http://localhost:5000/api/citas");
      if (existingCitasResponse.ok) {
        const existingCitas = await existingCitasResponse.json();
        const duplicateCita = existingCitas.find(
          (cita) =>
            cita.medico_id === medicoId &&
            format(new Date(cita.fecha), "yyyy-MM-dd") === format(fechaSeleccionada, "yyyy-MM-dd") &&
            cita.paciente_id === pacienteId
        );
  
        if (duplicateCita) {
          alert("Ya tienes una cita programada con el mismo médico para este día.");
          return;
        }
      } else {
        throw new Error("Error al obtener las citas existentes");
      }
  
      // Verificar si la hora ya está ocupada para la fecha seleccionada, pero solo en el mismo día
      const citasFechaResponse = await fetch(`http://localhost:5000/api/citas?fecha=${cita.fecha}&medico_id=${medicoId}`);
      if (citasFechaResponse.ok) {
        const citasFecha = await citasFechaResponse.json();
        const horaOcupada = citasFecha.find((cita) => {
          const citaHora = cita.hora.split(":")[0];
          const citaMinutos = cita.hora.split(":")[1];
          const selectedHora = selectedTimes[medicoId].split(":")[0];
          const selectedMinutos = selectedTimes[medicoId].split(":")[1];
  
          return (
            citaHora === selectedHora &&
            citaMinutos === selectedMinutos &&
            format(new Date(cita.fecha), "yyyy-MM-dd") === format(fechaSeleccionada, "yyyy-MM-dd")
          );
        });
  
        if (horaOcupada) {
          alert("La hora seleccionada ya está reservada para este día por otro paciente");
          return;
        }
      } else {
        throw new Error("Error al obtener las citas para la fecha seleccionada");
      }
  
      // Realizar la reserva de la cita
      const response = await fetch("http://localhost:5000/api/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cita),
      });
  
      if (response.ok) {
        console.log("Cita creada con éxito");
        alert("Cita reservada");
  
        // Actualizar el estado de horasOcupadas con la hora reservada
        setHorasOcupadas((prevHorasOcupadas) => {
          const horasOcupadasMedico = prevHorasOcupadas[medicoId] || []; // Verificar si prevHorasOcupadas[medicoId] existe y asignar un array vacío si no existe
          return {
            ...prevHorasOcupadas,
            [medicoId]: [...horasOcupadasMedico, selectedTimes[medicoId]],
          };
        });
      } else {
        throw new Error("Error al crear la cita");
      }
    } catch (error) {
      console.error("Error al crear la cita:", error);
      alert("Error al crear la cita");
    }
  };
  
  const isWeekday = (date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };

  const handleDateChange = (date, medicoId) => {
    setSelectedDates((prevState) => ({
      ...prevState,
      [medicoId]: date,
    }));
  };

  const handleTimeChange = (event, medicoId) => {
    const time = event.target.value;
    setSelectedTimes((prevState) => ({
      ...prevState,
      [medicoId]: time,
    }));
  };

  const handleMotivoChange = (event, medicoId) => {
    const motivo = event.target.value;
    setSelectedMotivos((prevState) => ({
      ...prevState,
      [medicoId]: motivo,
    }));
  };

  return (
    <>
      <div className="container-medicos" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h4>Nuestros especialistas</h4>
        <div className="container-cards" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
          {medicos && medicos.length > 0 ? (
            medicos.map((medico) => (
              <Card key={medico.dni} sx={{ width: "18rem", margin: "10px", padding: "0" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={convertBufferToDataURL(medico.imagen.data)}
                    alt="Doctor"
                  />
                  <CardContent style={{ display: "flex", flexDirection: "column" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {medico.nombre}: {medico.especialidad}.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ height: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {medico.descripcion}.
                    </Typography>
                    {/* <div className="custom-datepicker-container"> */}
                      {loggedInUser ? (
                        <>
                        <DatePicker 
                            calendarClassName="custom-calendar"
                            className="custom-datepicker datepicker"
                            selected={selectedDates[medico.id]}
                            onChange={(date) => handleDateChange(date, medico.id)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona una fecha"
                            filterDate={isWeekday}
                            excludeDates={availableDates.filter((date) => isWeekend(date))}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 20)}
                          />
                          <select
                            className="custom-select"
                            value={selectedTimes[medico.id]}
                            onChange={(event) => handleTimeChange(event, medico.id)}
                          >
                            <option value="">Selecciona una hora</option>
                            {timeSlots.map((time) => {
                              const formattedTime = format(time, "HH:mm");
                              const isHoraOcupada = Object.values(horasOcupadas[medico.id] || {}).includes(formattedTime);
                              return (
                                <option key={formattedTime} value={formattedTime} disabled={isHoraOcupada}>
                                  {formattedTime} {isHoraOcupada && "(Ocupada)"}
                                </option>
                              );
                            })}
                          </select>
                          <input
                            className="custom-input"
                            type="text"
                            placeholder="Motivo de la cita"
                            value={selectedMotivos[medico.id] || ""}
                            onChange={(event) => handleMotivoChange(event, medico.id)}
                          />
                  
                          <Button
                            className="custom-button" 
                            style={{ width: "100%", marginTop: "0.5rem", bottom: 0 }}
                            variant="contained"
                            onClick={() => Reserva(medico.id)}
                            disabled={!selectedDates[medico.id] || !selectedTimes[medico.id]}
                          >
                            Reservar cita
                          </Button>
              
                        </>
                      ) : (
                        <p>Inicia sesión para reservar una cita</p>
                      )}
                    {/* </div> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          ) : (
            <p>No se encontraron médicos</p>
          )}
        </div>
        <Link to="/">Volver</Link>
      </div>
    </>
  );
};

export default Medicos;
