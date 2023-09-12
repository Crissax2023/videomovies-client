import React, { useState,useContext } from "react";
//import axios from "axios";
//import { API_URL } from "../../utils/constants";
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/AssignmentInd';
import "../VideosPage/Agregarpeliculas.css"; // Importa tus estilos CSS aquí
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

const initLogInForm = {
  email: '',
  password: '',
};

const LogIn = (props) => {
  const [LogInStateForm, setLogInForm] = useState(initLogInForm);
const [errorMessage,setErrorMessage] = useState(undefined)

  const {storeToken,authenticateUser} = useContext(AuthContext)
   
  const navigate = useNavigate();

  const handleLogInForm = (nameField, value) => {
    setLogInForm((prevState) => ({
      ...prevState,
      [nameField]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try{
          //const response = await axios.post(`${API_URL}/auth/login`,LogInStateForm)
          const response = await authService.login(LogInStateForm) 
          navigate('/peliculas')

          storeToken(response.data.authToken); 
          authenticateUser();
        } catch (error) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        }
  };

  const cardStyle = {
    minWidth: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    marginTop: '2%', // Separación de la parte superior
    marginLeft: '200px', // Espacio en el lado izquierdo
    marginRight: '200px', // Espacio en el lado derecho
  };

  return (
    <div className="agregar-peliculas-container">
            {
            errorMessage && 
            <Alert severity="success" color="warning">
              {errorMessage}
            </Alert>
            }
      <form onSubmit={handleSubmit}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div" className="title-style">
              LogIn
            </Typography>
            <br />

            <Grid container spacing={3}>

              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="year-input">Correo</InputLabel>
                  <OutlinedInput
                    id="email-input"
                    label="Correo"
                    name="email"
                    value={LogInStateForm.email}
                    onChange={(e) => handleLogInForm('email', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="director-input">Contraseña</InputLabel>
                  <OutlinedInput
                    id="Password-input"
                    label="Password"
                    name="password"
                    type="password"
                    value={LogInStateForm.password}
                    onChange={(e) => handleLogInForm('password', e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center" xs={11.9}>
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                LogIn
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
      <br></br>
      <Alert severity="success" color="info">
            Si no tienes una cuenta registrate <Link to={'/signup'}>aqui</Link> 
      </Alert>
      <br>
      </br>
    </div>
  );
};

export default LogIn;
