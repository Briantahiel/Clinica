import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
// const multer = require('multer');
// const fs =  require('fs');
import fs from 'fs';
const upload = multer({ dest: 'uploads/' });


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'Brianmgz',
    password: 'brianTahielDante',
    database: 'consultorios',
    port: 3306,
});
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del Centro Médico!');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});
con.connect(err => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
// Definir el endpoint para registrar pacientes
app.post('/api/pacientes', (req, res) => {
  const { dni, nombre, apellido, email, password } = req.body;

  // Realizar la consulta SQL para insertar un nuevo paciente
  const query = `INSERT INTO pacientes (dni, nombre, apellido, email, password)
                 VALUES (?, ?, ?, ?, ?)`;

  con.query(query, [dni, nombre, apellido, email, password], (err) => {
    if (err) {
      console.error('Error al registrar el paciente: ', err);
      res.status(500).json({ error: 'Error al registrar el paciente' });
    } else {
      console.log('Paciente registrado exitosamente');
      res.status(200).json({ message: 'Paciente registrado exitosamente' });
    }
  });
});
// Definir el endpoint para loguear pacientes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Realizar la consulta SQL para verificar las credenciales del usuario
  const query = `SELECT * FROM pacientes WHERE email = ? AND password = ?`;
  con.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error al verificar las credenciales del usuario: ', err);
      res.status(500).json({ error: 'Error al verificar las credenciales del usuario' });
    } else {
      if (results.length > 0) {
        // Credenciales válidas, el usuario está autenticado
        const queryUser = `SELECT nombre, email, id AS paciente_id FROM pacientes WHERE email = ?`;
        con.query(queryUser, [email], (err, userResults) => {
          if (err) {
            console.error('Error al obtener los datos del usuario: ', err);
            res.status(500).json({ error: 'Error al obtener los datos del usuario' });
          } else {
            if (userResults.length > 0) {
              const { nombre, email, paciente_id } = userResults[0];
              console.log('Inicio de sesión exitoso');
              res.status(200).json({ message: 'Inicio de sesión exitoso', nombre, email, paciente_id });
            } else {
              console.log('No se encontraron datos de usuario');
              res.status(401).json({ error: 'No se encontraron datos de usuario' });
            }
          }
        });
      } else {
        // Credenciales inválidas, el usuario no está autenticado
        console.log('Credenciales inválidas, inicio de sesión fallido');
        res.status(401).json({ error: 'Credenciales inválidas, inicio de sesión fallido' });
      }
    }
  });
});

/////Consulta de Citas
app.get('/api/citas', (req, res) => {
  const query = 'SELECT * FROM citas';

  con.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener las citas:', err);
      res.status(500).json({ error: 'Error al obtener las citas' });
    } else {
      res.status(200).json(result);
    }
  });
});
////
app.get('/api/citasfecha', (req, res) => {
  const fecha = req.query.fecha;
  const medicoId = req.query.medico_id;

  // Consultar la base de datos para verificar si la cita está ocupada
  const query = 'SELECT * FROM citas WHERE fecha = ? AND medico_id = ?';
  con.query(query, [fecha, medicoId], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else {
      const citasOcupadas = results.length > 0;
      res.json({ disponible: !citasOcupadas });
    }
  });
});
////
app.get('/api/citas/:id', (req, res) => {
  const pacienteId = req.params.id;

  const query = `
    SELECT c.id, c.fecha, c.hora, c.motivo, m.nombre AS nombre_medico, p.nombre AS nombre_paciente, p.id AS paciente_id
    FROM citas AS c
    INNER JOIN medicos AS m ON c.medico_id = m.id
    INNER JOIN pacientes AS p ON c.paciente_id = p.id
    WHERE p.id = ?
  `;

  con.query(query, [pacienteId], (err, results) => {
    if (err) {
      console.error('Error al obtener los datos de las citas: ', err);
      res.status(500).json({ error: 'Error al obtener los datos de las citas' });
    } else {
      if (results.length > 0) {
        const citas = results;
        res.status(200).json(citas);
      } else {
        res.status(404).json({ error: 'No se encontraron citas' });
      }
    }
  });
});

app.delete('/api/citas/:id/:pacienteId', (req, res) => {
  const citaId = req.params.id;
  const pacienteId = req.params.pacienteId;

  // Verificar si el paciente tiene permiso para eliminar la cita
  const verificarPermiso = `SELECT * FROM citas WHERE id = ? AND paciente_id = ?`;
  con.query(verificarPermiso, [citaId, pacienteId], (err, results) => {
    if (err) {
      console.error('Error al verificar los permisos para eliminar la cita: ', err);
      res.status(500).json({ error: 'Error al verificar los permisos para eliminar la cita' });
    } else {
      if (results.length > 0) {
        // El paciente tiene permisos, eliminar la cita
        const eliminarCita = `DELETE FROM citas WHERE id = ?`;
        con.query(eliminarCita, [citaId], (err, result) => {
          if (err) {
            console.error('Error al eliminar la cita: ', err);
            res.status(500).json({ error: 'Error al eliminar la cita' });
          } else {
            res.status(200).json({ message: 'Cita eliminada correctamente' });
          }
        });
      } else {
        // El paciente no tiene permisos para eliminar la cita
        res.status(401).json({ error: 'No tienes permisos para eliminar esta cita' });
      }
    }
  });
});

app.post('/api/citas', (req, res) => {
  const { paciente_id, medico_id, fecha, hora, motivo } = req.body;

  const query = `INSERT INTO citas (paciente_id, medico_id, fecha, hora, motivo) VALUES (?, ?, ?, ?, ?)`;
  const values = [paciente_id, medico_id, fecha, hora, motivo];

  con.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al crear la cita:', err);
      res.status(500).json({ error: 'Error al crear la cita' });
    } else {
      console.log('Cita creada con éxito');
      res.status(200).json({ message: 'Cita creada con éxito' });
    }
  });
});
////Medicos
// app.get('/api/medicos', (req, res) => {
//   const obtenerMedicos = 'SELECT * FROM medicos';

//   con.query(obtenerMedicos, (err, results) => {
//     if (err) {
//       console.error('Error al obtener los médicos: ', err);
//       res.status(500).json({ error: 'Error al obtener los médicos' });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });
app.get('/api/medicos', (req, res) => {
  const obtenerMedicos = 'SELECT *, CONCAT("http://localhost:5000/", imagen) AS imagenURL FROM medicos';

  con.query(obtenerMedicos, (err, results) => {
    if (err) {
      console.error('Error al obtener los médicos: ', err);
      res.status(500).json({ error: 'Error al obtener los médicos' });
    } else {
      res.status(200).json(results);
    }
  });
});

// app.post('/api/medicos', (req, res) => {
//   const { dni, nombre, especialidad, username, password} = req.body;

//   // Realizar la consulta SQL para insertar un nuevo médico en la base de datos
//   const query = `INSERT INTO medicos (dni, nombre, especialidad, username, password) VALUES (?, ?, ?, ?, ?)`;
//   con.query(query, [dni, nombre, especialidad, username, password], (err, results) => {
//     if (err) {
//       console.error('Error al crear el médico: ', err);
//       res.status(500).json({ error: 'Error al crear el médico' });
//     } else {
//       const medicoId = results.insertId;
//       console.log('Médico creado exitosamente');
//       res.status(201).json({ message: 'Médico creado exitosamente', medicoId });
//     }
//   });
// });

////

app.post('/api/medicos', upload.single('imagen'), (req, res) => {
  const { dni, nombre, especialidad, username, password, descripcion } = req.body;
  const imagenPath = req.file.path;

  // Leer el contenido de la imagen y convertirlo en un Buffer
  const imagenData = fs.readFileSync(imagenPath);

  // Realizar la consulta SQL para insertar un nuevo médico en la base de datos
  const query = `INSERT INTO medicos (dni, nombre, especialidad, username, password, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  con.query(
    query,
    [dni, nombre, especialidad, username, password, descripcion, imagenData],
    (err, results) => {
      if (err) {
        console.error('Error al crear el médico: ', err);
        res.status(500).json({ error: 'Error al crear el médico' });
      } else {
        const medicoId = results.insertId;
        console.log('Médico creado exitosamente');
        res.status(201).json({ message: 'Médico creado exitosamente', medicoId });
      }
    }
  );

  // Eliminar el archivo de imagen temporal
  fs.unlinkSync(imagenPath);
});
app.get("/api/medicos/:medicoId/ocupado", (req, res) => {
  const { medicoId } = req.params;
  const { fecha, hora } = req.query;

  // Verificar si el médico existe en la base de datos
  const checkMedicoQuery = "SELECT id FROM medicos WHERE id = ?";
  con.query(checkMedicoQuery, [medicoId], (error, results) => {
    if (error) {
      console.error("Error al verificar el médico:", error);
      res.status(500).json({ error: "Error al verificar el médico" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Médico no encontrado" });
    } else {
      // Verificar si el médico está ocupado en la hora y fecha especificadas
      const checkCitaQuery =
        "SELECT id FROM citas WHERE medico_id = ? AND fecha = ? AND hora = ?";
      con.query(checkCitaQuery, [medicoId, fecha, hora], (error, results) => {
        if (error) {
          console.error("Error al verificar la disponibilidad del médico:", error);
          res.status(500).json({ error: "Error al verificar la disponibilidad del médico" });
        } else if (results.length > 0) {
          res.json({ ocupado: true });
        } else {
          // No hay citas existentes en esa hora y fecha, se puede reservar
          res.json({ ocupado: false });
        }
      });
    }
  });
});
