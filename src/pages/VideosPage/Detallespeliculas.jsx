import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Agregarcomentarios from './Agregarcomentarios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import videosService from '../../services/videos.service';
import comentariosService from "../../services/comentarios.service";


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


const Agregarpeliculas = () => {

  const cardStyle = {
    minWidth: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    marginTop: '2%', // Separación de la parte superior
    marginLeft: '100px', // Espacio en el lado izquierdo
    marginRight: '100px', // Espacio en el lado derecho
  };

  const cardStyle2 = {
    minWidth: 25,
    backgroundColor: 'rgba(229, 20, 232, 0.15)',
    backdropFilter: 'blur(10px)',
    marginTop: '2%', // Separación de la parte superior
    marginLeft: '40px', // Espacio en el lado izquierdo
    marginRight: '40px', // Espacio en el lado derecho
  };

  const inputStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
  };

  const titleStyle = {
    color: 'white', // Color de la letra en blanco
    fontWeight: 'bold', // Letra en negrita
  };

const [peliculas,setpeliculas] = useState(null)

const {peliculasId} = useParams()

const getOnePeliculas = async ()=>{

  //const onepelicula = (await axios.get(`${API_URL}/api/peliculas/${peliculasId}`)).data
  const onepelicula = await videosService.getOneVideo(peliculasId)
  setpeliculas(onepelicula.data)
}

useEffect(() => {
  getOnePeliculas();
},[]);

const deletecomentario = async (comentarioId) => {
//await axios.delete(`${API_URL}/api/comentarios/${comentarioId}`)
await comentariosService.deleteComentarios(comentarioId);

getOnePeliculas()
}

  return (
    <>

  {
  peliculas &&(

      <form>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div" sx={titleStyle}>
              Pelicula
            </Typography>
            <br></br>

            <Grid container spacing={5}>
              <Grid item xs={12} container justifyContent="center">
                  <CardMedia 
                    id="outlined-basic"
                    label="Ingresa Url de Imagen"
                    name="url"
                    component="img"
                    height="400"
                    alt={peliculas.title}
                    image={peliculas.url}
                    variant="outlined"
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '20%' }} // Fondo blanco y ancho completo
                  />
                </Grid>
              <Grid item xs={15}>
                <TextField
                  id="outlined-basic"
                  label="Titulo Pelicula"
                  name="title"
                  variant="outlined"
                  value={peliculas.title}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Año Lanzamiento"
                  name="year"
                  value={peliculas.year}
                  type="number"
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Director"
                  name="director"
                  value={peliculas.director}
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)',width: '100%' }} // Fondo blanco y ancho completo
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Duración"
                  name="duracion"
                  value={peliculas.duracion}
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Genero"
                  name="genero"
                  value={peliculas.genero}
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                />
              </Grid>
              
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="flex-end" item xs={11.9}>
              <Link to={`/peliculas/edit/${peliculasId}`}>
              <Button variant="contained" type="submit" size="large" endIcon={<SendIcon />}>
                Editar
              </Button>
              </Link>
  
            </Grid>
          </CardActions>
        </Card>
         <br></br>
      </form>
   
              )
  }

  <div>
        <div>
            <Agregarcomentarios peliculasId={peliculasId} getOnePeliculas={getOnePeliculas}/>
        </div>
        <div>
        {
  peliculas &&
  peliculas.comentarios.map(comentario=>(

    <Card sx={cardStyle2}>
    <CardContent>
      <Typography variant="h5" component="div" sx={titleStyle}>
        Comentarios
      </Typography>
      <br></br>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            id="outlined-basic"
            label="Nombre"
            name="Nombre"
            variant="outlined"
            value={comentario.Nombre}
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="outlined-basic"
            label="Año de publicacion"
            name="year"
            variant="outlined"
            value={comentario.year}
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={15}>
          <TextField
            id="outlined-basic"
            label="Comentarios"
            name="comentarios"
            variant="outlined"
            value={comentario.comentarios}
            sx={inputStyle}
          />
      </Grid>
      <Grid item xs={13} sm={11}>
      <Typography component="legend" sx={{ color: 'white'}}>Califica la Pelicula</Typography>
          <StyledRating
            name="Rating"
            defaultValue={2}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={1}
            icon={<FavoriteIcon fontSize="large" />}
            emptyIcon={<FavoriteBorderIcon fontSize="large" />}
            value={comentario.Rating}

          />
        </Grid>
        <Grid item xs={1} sm={1}>
        <Tooltip title="Delete">
          <IconButton 
          type="submit"
          color="secondary" 
          aria-label="delete" 
          size="large"
          onClick={()=> deletecomentario(comentario._id)}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Tooltip>  
        </Grid>
      </Grid>
    </CardContent>
    
  </Card>
  
                                          )


                            )
  }
        </div><br></br>
  </div>


  
    </>
  );
};

export default Agregarpeliculas;