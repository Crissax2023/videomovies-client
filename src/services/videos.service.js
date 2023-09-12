import service from './index.service';


const videosService = {
    getAllVideo: () => service.get('/api/peliculas'),
    deleteVideo: (peliculaId) => service.delete(`/api/peliculas/${peliculaId}`),
    createVideo: (dataForm) => service.post('/api/peliculas', dataForm),
    getOneVideo: (peliculasId) => service.get(`/api/peliculas/${peliculasId}`),
    getEditVideo: (peliculasId) => service.get(`/api/peliculas/${peliculasId}`),
    putVideo:(peliculasId,dataForm) => service.put(`/api/peliculas/${peliculasId}`,dataForm)
   // await axios.put(`${API_URL}/api/peliculas/${peliculasId}`, videosStateForm);

}    


export default videosService;