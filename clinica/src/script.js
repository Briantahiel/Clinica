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

app.post('/api/usuarios', (req, res) => {
  const { dni, nombre, apellido, email, password } = req.body;
  const query = `INSERT INTO usuarios (dni, nombre, apellido, email, password) VALUES (?, ?, ?, ?, ?)`;
  con.query(query, [dni, nombre, apellido, email, password], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

//////////////

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM usuarios WHERE email = ?`;
  con.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      if (result.length > 0) {
        const user = result[0];
        if (user.password === password) {
          // Las credenciales son válidas

          res.sendStatus(200);
        } else {
          // Contraseña incorrecta
          res.sendStatus(401);
        }
      } else {
        // Usuario no encontrado
        res.sendStatus(404);
      }
    }
  });
});
