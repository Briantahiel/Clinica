

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
    <div className="container-servicios-info">
        <h6>NUESTROS SERVICIOS</h6>
        <h3>Qué ofrecemos para ti</h3>
        <p>Todos nuestros tratamientos y servicios se brindan en una cómoda clínica, diseñada de acuerdo con altos estándares de calidad.</p>
    </div>
    <div className="container-servicios">
    <Grid className='card-container'>
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardActionArea className='card-style'>
        <CardMedia className='card-img'
          component="img"
          height="180"
          image=" /img/paciente1.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia className='card-img'
          component="img"
          height="180"
          image=" /img/paciente2.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia className='card-img'
          component="img"
          height="180"
          image=" /img/paciente3.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    </div>
    </>
  );
};

export default Servicios;
