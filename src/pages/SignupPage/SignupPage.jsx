import React, { useState } from "react";
//import axios from "axios";
import authService from "../../services/auth.service";
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
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/AssignmentInd';
import "../VideosPage/Agregarpeliculas.css"; // Importa tus estilos CSS aquí

const initSignupForm = {
  name: '',
  email: '',
  password: '',
};

const Signup = (props) => {
  const [SignupStateForm, setSignupForm] = useState(initSignupForm);

  const [errorMessage,setErrorMessage] = useState(undefined)

  const navigate = useNavigate();

  const handleSignupForm = (nameField, value) => {
    setSignupForm((prevState) => ({
      ...prevState,
      [nameField]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //await axios.post(`${API_URL}/auth/signup`, SignupStateForm)
      //const response = 
      await authService.signup(SignupStateForm)
      navigate('/login')
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
              SignUp
            </Typography>
            <br />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="title-input">Name</InputLabel>
                  <OutlinedInput
                    id="Name"
                    label="name"
                    name="name"
                    value={SignupStateForm.name}
                    onChange={(e) => handleSignupForm('name', e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="year-input">Correo</InputLabel>
                  <OutlinedInput
                    id="email-input"
                    label="Correo"
                    name="email"
                    value={SignupStateForm.email}
                    onChange={(e) => handleSignupForm('email', e.target.value)}
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
                    value={SignupStateForm.password}
                    onChange={(e) => handleSignupForm('password', e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center" xs={11.9}>
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                SignUp
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
      <br></br>
      <Alert severity="success" color="info">
            Si ya cuentas con una cuenta logueate <Link to={'/login'}>aqui</Link> 
      </Alert>
      <br>
      </br>
    </div>
  );
};

export default Signup;