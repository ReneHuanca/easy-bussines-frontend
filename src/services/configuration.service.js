import axios from '../axios'
import authHeader from './header.service'

class ConfigurationService
{

    getOneConfiguration(id) {
        return axios.get(`/settings/${id}`, { 
            headers: authHeader()
        })
    }

    updateConfiguration(id, config) {
        return axios.put(`/settings/${id}`, {
            currency: config.currency,
            time_jwt: config.time_jwt
        },{
            headers: authHeader()
        })
    }

}

export default new ConfigurationService();