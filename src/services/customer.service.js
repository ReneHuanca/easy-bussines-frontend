import axios from '../axios'
import authHeader from './header.service'

class CustomerService
{

    getAllCustomers() {
        return axios.get(`/customers`, { 
            headers: authHeader() 
        });
    }

    getOneCustomer(id) {
        return axios.get(`/customers/${id}`, { 
            headers: authHeader() 
        });
    }

    addCustomer(customer) {
        return axios.post(`/customers`, {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            company: customer.company,
            country: customer.country,
            city: customer.city,
            website: customer.website,
            social: customer.social,
            history: customer.history,
        },{
             headers: authHeader() 
        })
    }

    updateCustomer(id, customer) {
        return axios.put(`/customers/${id}`, {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            company: customer.company,
            country: customer.country,
            city: customer.city,
            website: customer.website,
            social: customer.social,
            history: customer.history,
        },{ 
            headers: authHeader() 
        })
    }

    deleteCustomer(id) {
        return axios.delete(`/customers/${id}`, { 
            headers: authHeader() 
        });
    }

}

export default new CustomerService();