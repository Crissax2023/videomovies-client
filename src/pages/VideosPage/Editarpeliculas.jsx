import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import videosService from '../../services/videos.service';


const initPeliculasForm = {
    title: '',
    year: '',
    director: '',
    duracion: '',
    genero: '',
    url: '',
  };

const Editarpeliculas = () => {
  const [videosStateForm, setVideosStateForm] = useState(initPeliculasForm);

  const updateVideoForm = (nameField, value) => {
    setVideosStateForm((prevState) => ({
      ...prevState,
      [nameField]: value,
    }));
  };

  const {peliculasId} = useParams()
  /*
  useEffect(() => {
   // axios.get(`${API_URL}/api/peliculas/${peliculasId}`)
    await videosService.getEditVideo(peliculasId)

    .then(response=>{
        const onepelicula = response.data
        updateVideoForm("title", onepelicula.title)
        updateVideoForm("year", onepelicula.year)
        updateVideoForm("director", onepelicula.director)
        updateVideoForm("duracion", onepelicula.duracion)
        updateVideoForm("genero", onepelicula.genero)
        updateVideoForm("url", onepelicula.url)

    })
    .catch(error => console.log(error))
  },[]);
*/
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await videosService.getEditVideo(peliculasId);
      const onepelicula = response.data;
      updateVideoForm("title", onepelicula.title);
      updateVideoForm("year", onepelicula.year);
      updateVideoForm("director", onepelicula.director);
      updateVideoForm("duracion", onepelicula.duracion);
      updateVideoForm("genero", onepelicula.genero);
      updateVideoForm("url", onepelicula.url);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [peliculasId]);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //await axios.put(`${API_URL}/api/peliculas/${peliculasId}`, videosStateForm);
      
      const response = await videosService.putVideo(peliculasId, videosStateForm)

      setVideosStateForm(initPeliculasForm);
      navigate(`/peliculas/${peliculasId}`)
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const cardStyle = {
    minWidth: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div" sx={titleStyle}>
              Editar Pelicula
            </Typography>
            <br></br>

            <Grid container spacing={5}>
              <Grid item xs={15}>
                <TextField
                  id="outlined-basic"
                  label="Titulo Pelicula"
                  name="title"
                  variant="outlined"
                  value={videosStateForm.title}
                  sx={inputStyle}
                  onChange={(e) => updateVideoForm('title', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Año Lanzamiento"
                  name="year"
                  value={videosStateForm.year}
                  type="number"
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updateVideoForm('year', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Director"
                  name="director"
                  value={videosStateForm.director}
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)',width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updateVideoForm('director', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Duración"
                  name="duracion"
                  value={videosStateForm.duracion}
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updateVideoForm('duracion', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Genero"
                  name="genero"
                  value={videosStateForm.genero}
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updateVideoForm('genero', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresa Url de Imagen"
                  name="url"
                  value={videosStateForm.url}
                  variant="outlined"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%' }} // Fondo blanco y ancho completo
                  onChange={(e) => updateVideoForm('url', e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="flex-end" item xs={11.9}>
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Editar
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default Editarpeliculas;