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
    database: 'centro_medico',
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
///////Pacientes////////
app.post('/api/usuarios', (req, res) => {
  const { dni, nombre, apellido, email, password } = req.body;
  const query = `INSERT INTO usuarios (dni, nombre, apellido, email, password) VALUES (?, ?, ?, ?, ?)`;
  con.query(query, [dni, nombre, apellido, email, password], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// app.get('/api/usuarios', (req, res) => {
//   const query = 'SELECT * FROM usuarios';

//   con.query(query, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Error en el servidor' });
//     }

//     res.status(200).json(result);
//   });
// });
app.get('/api/usuarios', (req, res) => {
  const email = req.query.email;
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  con.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    res.status(200).json(result);
  });
});

/////////Medicos////////
// app.post('/api/medicos', (req, res) => {
//   const { nombre, apellido, especialidad, telefono, email } = req.body;
//   const query = 'INSERT INTO medicos (nombre, apellido, especialidad, telefono, email) VALUES (?, ?, ?, ?, ?)';
//   con.query(query, [nombre, apellido, especialidad, telefono, email], (err, result) => {
//     if (err) throw err;
//     res.sendStatus(200);
//   });
// });
app.post('/api/medicos', (req, res) => {
  const { nombre, apellido, especialidad, telefono, email } = req.body;
  const query = 'INSERT INTO medicos (nombre, apellido, especialidad, telefono, email) VALUES (?, ?, ?, ?, ?)';
  con.query(query, [nombre, apellido, especialidad, telefono, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.status(200).json({ message: 'Médico agregado exitosamente' });
    }
  });
});
app.get('/api/medicos', (req, res) => {
  const query = 'SELECT * FROM medicos';
  con.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.status(200).json(result);
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
////////////Citas/////////////////
app.post('/api/citas', (req, res) => {
  const { paciente_id, medico_id, fecha, hora, motivo } = req.body;
  const query = 'INSERT INTO citas (paciente_id, medico_id, fecha, hora, motivo) VALUES (?, ?, ?, ?, ?)';
  con.query(query, [paciente_id, medico_id, fecha, hora, motivo], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.status(200).json({ message: 'Cita agregada exitosamente' });
    }
  });
});

//////////////////////////////////
//////////////

// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;
//   const query = `SELECT * FROM usuarios WHERE email = ?`;
//   con.query(query, [email], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     } else {
//       if (result.length > 0) {
//         const user = result[0];
//         if (user.password === password) {
//           // Las credenciales son válidas

//           res.sendStatus(200);
//         } else {
//           // Contraseña incorrecta
//           res.sendStatus(401);
//         }
//       } else {
//         // Usuario no encontrado
//         res.sendStatus(404);
//       }
//     }
//   });
// });
// JSON formate to be manipulated by frontend
// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;
//   const query = `SELECT * FROM usuarios WHERE email = ?`;
//   con.query(query, [email], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error en el servidor' });
//     } else {
//       if (result.length > 0) {
//         const user = result[0];
//         if (user.password === password) {
//           // Las credenciales son válidas
//           res.status(200).json({ user });
//         } else {
//           // Contraseña incorrecta
//           res.status(401).json({ error: 'Credenciales inválidas' });
//         }
//       } else {
//         // Usuario no encontrado
//         res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//     }
//   });
// });

/////////////// FUNCIONA
// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;
//   const query = `SELECT * FROM usuarios WHERE email = ?`;
//   con.query(query, [email], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error en el servidor' });
//     } else {
//       if (result.length > 0) {
//         const user = result[0];
//         if (user.password === password) {
//           // Las credenciales son válidas
//           res.status(200).json({ name: user.nombre, email: user.email });
//         } else {
//           // Contraseña incorrecta
//           res.status(401).json({ error: 'Credenciales inválidas' });
//         }
//       } else {
//         // Usuario no encontrado
//         res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//     }
//   });
// });
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM usuarios WHERE email = ?`;
  con.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      if (result.length > 0) {
        const user = result[0];
        if (user.password === password) {
          // Las credenciales son válidas
          res.status(200).json({ name: user.nombre, email: user.email });
        } else {
          // Contraseña incorrecta
          res.status(401).json({ error: 'Credenciales inválidas' });
        }
      } else {
        // Usuario no encontrado
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});

/////////////// FUNCIONA
// app.get('/api/user/:email', (req, res) => {
//   const { email } = req.params;
//   const query = `SELECT nombre FROM usuarios WHERE email = ?`;
//   con.query(query, [email], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error en el servidor' });
//     } else {
//       if (result.length > 0) {
//         const { nombre } = result[0];
//         res.status(200).json({ name: nombre });
//       } else {
//         res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//     }
//   });
// });
///////////////////