import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import Listapeliculas from "./pages/VideosPage/Listapeliculas";
import Detallespeliculas from "./pages/VideosPage/Detallespeliculas";
import Agregarpeliculas from "./pages/VideosPage/Agregarpeliculas";
import Editarpeliculas from "./pages/VideosPage/Editarpeliculas";
import Signup from "./pages/SignupPage/SignupPage";
import LogIn from "./pages/LoginPage/LoginPage";
import IsPrivate from "./components/IsPrivate/IsPrivate";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/peliculas' element={ <IsPrivate><Listapeliculas/></IsPrivate> }/>
          <Route path='/peliculas/:peliculasId' element={<IsPrivate><Detallespeliculas/></IsPrivate>}/>
          <Route path='/add-peliculas' element={<IsPrivate><Agregarpeliculas/></IsPrivate>}/>
          <Route path='/peliculas/edit/:peliculasId' element={<IsPrivate><Editarpeliculas/></IsPrivate>}/>
          <Route path='/signup' element={<isAnon><Signup/></isAnon>}/>
          <Route path='/login' element={<isAnon><LogIn/></isAnon>}/>

        </Routes>
    </div>
  );
}

export default App;
