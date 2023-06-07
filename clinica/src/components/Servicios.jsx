

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import { makeStyles } from '@mui/styles';
import "../Servicios.css"

// const useStyles = makeStyles(() => ({
//   cardContainer: {
//     maxWidth: 345,
//     position: 'relative',
//     overflow: 'hidden',
//   },
// }));

const Servicios = () => {
  // const classes = useStyles();
  // const [isHovered, setIsHovered] = React.useState(false);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  return (
    <>
    <div className='servicios-container'>
    <div className="container-servicios-info">
        <h5>NUESTROS SERVICIOS</h5>
        <p>Todos nuestros tratamientos y servicios se brindan en una cómoda clínica, diseñada de acuerdo con altos estándares de calidad.</p>
    </div>
    <div className="container-servicios">
    <Grid className='card-container'>
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardActionArea className='card-style'>
        <div className="card-img-container">
          <CardMedia
            className="card-img"
            component="img"
            image="/img/paciente1.jpg"
            alt="paciente"
          />
        </div>
        <CardContent className='card-content'>
          <div className='card-info'>
            <Typography gutterBottom variant="h5" component="div" className='card-title'>
            Odontología General
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Los pacientes pueden recibir tratamientos generales en una sola sesión.
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardActionArea>
      <div className="card-img-container">
          <CardMedia
            className="card-img"
            component="img"
            image="/img/paciente2.jpg"
            alt="paciente"
          />
        </div>
        <CardContent className='card-content'>
        <div className='card-info'>
          <Typography gutterBottom variant="h5" component="div" className='card-title'>
            Odontología Cosmética
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Nuestros tratamientos vuelven tus dientes la sonrisa soñada.
          </Typography>
        </div>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardActionArea>
        <div className="card-img-container">
            <CardMedia
              className="card-img"
              component="img"
              image="/img/paciente3.jpg"
              alt="paciente"
            />
        </div>
        <CardContent className='card-content'>
        <div className='card-info'>
          <Typography gutterBottom variant="h5" component="div" className='card-title'>
            Implantes Dentales
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recupera la confianza de lucir una dentadura perfecta.
          </Typography>
        </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    </div>
    </div>
    </>
  );
};

export default Servicios;
