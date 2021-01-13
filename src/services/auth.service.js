import axios from '../axios'
import header from './customer.service'
import authHeader from './header.service'

class AuthService 
{
    
    async login(user) {
        try {
            const response = await axios.post('/login', {
                email: user.email,
                password: user.password
            })
            if (response.data.access_token) {
                localStorage.setItem('userToken', JSON.stringify(response.data));
            }
            
            return response.data;
        } catch (error) {
            throw new Error(401)
        }

    }

    logout() {
        localStorage.removeItem('userToken');
    }

    me() {
        return axios.post(`/me`, {}, {
            headers: authHeader()
        });
    }

    register(user) {
        return axios.post('register', {
            name: user.name,
            email: user.email,
            password: user.password
        });
    }

    // change password
    changePassword(user) {
        return axios.post(`/update-password`, {
            newPassword: user.password,
            newPassword_confirmation: user.password_confirmation,
        }, {
            headers: authHeader()
        });
    }
}

export default new AuthService();
