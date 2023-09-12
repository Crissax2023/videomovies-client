import React, { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
//import axios from 'axios';
//import { API_URL } from '../../utils/constants';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import comentariosService from '../../services/comentarios.service';
import { AuthContext } from '../../context/auth.context';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const initComentariosForm = {
  Nombre:'',
  year: new Date().getFullYear().toString(),
  Rating:0,
  comentarios: '',
};

const Agregarcomentarios = (props) => {
  const [comentarioStateForm, setComentarioStateForm] = useState(initComentariosForm);
  const {user} = useContext(AuthContext)

    //const navigate = useNavigate()

  const updatecomentarioForm = (nameField, value) => {
    setComentarioStateForm((prevState) => ({
      ...prevState,
      [nameField]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
   //   await axios.post(`${API_URL}/api/comentarios`, 
   //   {...comentarioStateForm,peliculasId:props.peliculasId});
      await comentariosService.createComentario( {...comentarioStateForm,peliculasId:props.peliculasId})
      setComentarioStateForm(initComentariosForm);
      props.getOnePeliculas()
     // navigate('/peliculas')
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const cardStyles = {
    minWidth: 20,
    backgroundColor: 'rgba(20, 116, 232, 0.2)',
    backdropFilter: 'blur(5px)',
    marginTop: '2%', // Separación de la parte superior
    marginLeft: '40px', // Espacio en el lado izquierdo
    marginRight: '40px', // Espacio en el lado derecho
  };


  const titleStyle = {
    color: 'white', // Color de la letra en blanco
    fontWeight: 'bold', // Letra en negrita
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={cardStyles}>
          <CardContent>
            <Typography variant="h5" component="div" sx={titleStyle}>
              Agregar Comentario - Sinopsis de Pelicula
            </Typography>
            <br></br>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  name="Nombre"
                  value={ user.name}
                  variant="outlined"
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)',width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updatecomentarioForm('Nombre', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-basic"
                  label="Año"
                  name="year"
                  type="number"
                  value={comentarioStateForm.year}
                  variant="outlined"
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updatecomentarioForm('year', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Comentarios"
                  name="comentarios"
                  value={comentarioStateForm.comentarios}
                  variant="outlined"
                  required
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updatecomentarioForm('comentarios', e.target.value)}
                />
              </Grid>
                          
            <Grid item xs={12}>
            <Typography component="legend" sx={{ color:'white',fontSize: '30px',fontWeight: 'bold'}}>Califica la Pelicula</Typography>

            <StyledRating
            name="Rating"
            defaultValue={3}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={1}
            icon={<FavoriteIcon fontSize="large" />}
            emptyIcon={<FavoriteBorderIcon fontSize="large" />}
            value={comentarioStateForm.Rating}
            onChange={(e) => updatecomentarioForm('Rating', e.target.value)}

          />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="flex-end" item xs={11.9}>
              <Button  variant="contained" type="submit" endIcon={<SendIcon />}>
                Agregar Comentario
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default Agregarcomentarios;
