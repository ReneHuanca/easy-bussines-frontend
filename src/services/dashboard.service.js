import axios from '../axios'
import authHeader from './header.service'

class DashboardService
{

    earningsPerMonth() {
        return axios.get(`earnings-per-month-diagram`, { 
            headers: authHeader()
        });
    }

    monthlyEarning() {
        return axios.get(`monthly-earning`, { 
            headers: authHeader()
        });
    }
    
    annualEarning() {
        return axios.get(`annual-earning`, { 
            headers: authHeader()
        });
    }

}

export default new DashboardService();