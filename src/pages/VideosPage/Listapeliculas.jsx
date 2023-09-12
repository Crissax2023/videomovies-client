import React, { useEffect, useState } from "react";
//import axios from "axios";
//import { API_URL } from "../../utils/constants";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import "./Listapeliculas.css"; // Importa tus estilos CSS aquí
import videosService from "../../services/videos.service";

const Listapeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);


    // Función para manejar errores
    const handleError = (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
    }

    // Función para manejar la carga
    const handleLoading = () => {
        setLoading(false);
    }

    // Función para eliminar una película
    const deletePelicula = async (peliculaId) => {
        try {
            //await axios.delete(`${API_URL}/api/peliculas/${peliculaId}`);
            await videosService.deleteVideo(peliculaId)
            setShowAlert(true);
            fetchData();
        } catch (error) {
            handleError("Error al eliminar la película.");
        }
    }

    const fetchData = async () => {
        try {
            //const storedToken = localStorage.getItem('authToken')
            /*const response = await axios.get(`${API_URL}/api/peliculas`,
               
            { 
                headers:{Authorization:`Bearer ${storedToken}`}
            }/
            );*/
            const response = await videosService.getAllVideo()
            setPeliculas(response.data);
            handleLoading();
        } catch (error) {
            handleError("Error al cargar los datos.",error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const subheaderStyle = {
        backgroundColor: '#212258',
        color: 'white',
        fontSize: '30px',
    };
    
    return (
        <div className="listapeliculas-container">

{showAlert && (
    
    <Grid item xs={12}>
        <br></br>
        <Alert severity="success" className="alert">
            <Typography variant="body1">Pelicula Eliminada</Typography>
        </Alert>
    </Grid>
)}

            
            <ImageList className="image-list" cols={5}>
                <ImageListItem key="Subheader" cols={5}>
                    <ListSubheader component="div" style={subheaderStyle}>Peliculas</ListSubheader>                </ImageListItem>

                {loading ? (
                    <Grid item xs={12}>
                        <Typography variant="body1">Cargando...</Typography>
                    </Grid>
                ) : error ? (
                    <Grid item xs={12}>
                        <Typography variant="body1">{error}</Typography>
                    </Grid>
                ) : peliculas.length === 0 ? (
                    <Grid item xs={12}>
                        <Alert severity="info" className="alert">
                            <Typography variant="body1">No hay películas en la lista.</Typography>
                        </Alert>
                    </Grid>
                ) : (
                    peliculas.map((peliculaItem) => (
                        <ImageListItem key={peliculaItem._id} cols={1}>
                            <img
                                src={peliculaItem.url}
                                alt={peliculaItem.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={peliculaItem.title}
                                subtitle={peliculaItem.director}
                                actionIcon={
                                    <div>
                                        <Tooltip title="Revisar Comentarios">
                                            <Link to={`/peliculas/${peliculaItem._id}`}>
                                                <IconButton
                                                     sx={{ color: 'rgba(255, 255, 255, 0.54)' }} 
                                                    aria-label={`info about ${peliculaItem.title}`}
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                        <Tooltip title="Eliminar Pelicula">
                                            <IconButton
                                                 sx={{ color: 'rgba(255, 255, 255, 0.54)' }} 
                                                onClick={() => deletePelicula(peliculaItem._id)}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                }
                            />
                        </ImageListItem>
                    ))
                )}
            </ImageList>
        </div>
    );
}

export default Listapeliculas;
