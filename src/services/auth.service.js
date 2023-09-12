import service from './index.service';

const authService = {
    signup: (formData) => service.post('/auth/signup', formData),
    login: (formData) => service.post('/auth/login', formData),
    verify: () => service.get('/auth/verify')
} //await axios.post(`${API_URL}/auth/signup`, SignupStateForm)

export default authService;
