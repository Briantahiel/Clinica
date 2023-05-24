import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

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
// Definir el endpoint para el inicio de sesión
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
        const queryUser = `SELECT nombre, email FROM pacientes WHERE email = ?`;
        con.query(queryUser, [email], (err, userResults) => {
          if (err) {
            console.error('Error al obtener los datos del usuario: ', err);
            res.status(500).json({ error: 'Error al obtener los datos del usuario' });
          } else {
            if (userResults.length > 0) {
              const { nombre, email } = userResults[0];
              console.log('Inicio de sesión exitoso');
              res.status(200).json({ message: 'Inicio de sesión exitoso', nombre, email });
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
app.get('/api/citas/:id', (req, res) => {
  const citaId = req.params.id;

  const query = `
    SELECT c.id, c.fecha, c.hora, c.motivo, m.nombre AS nombre_medico, p.nombre AS nombre_paciente, p.id AS paciente_id
    FROM citas AS c
    INNER JOIN medicos AS m ON c.medico_id = m.id
    INNER JOIN pacientes AS p ON c.paciente_id = p.id
    WHERE c.id = ?
  `;

  con.query(query, [citaId], (err, results) => {
    if (err) {
      console.error('Error al obtener los datos de la cita: ', err);
      res.status(500).json({ error: 'Error al obtener los datos de la cita' });
    } else {
      if (results.length > 0) {
        const cita = results[0];
        res.status(200).json(cita);
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    }
  });
});

