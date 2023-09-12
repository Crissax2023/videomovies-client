import service from './index.service';


const comentariosService = {
    deleteComentarios: (comentarioId) => service.delete(`/api/comentarios/${comentarioId}`),
    createComentario: (dataForm) => service.post('/api/comentarios', dataForm)
}

export default comentariosService;