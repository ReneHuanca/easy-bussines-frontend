import axios from '../axios'
import authHeader from './header.service'

class CategoryService
{

    getAllCategories() {
        return axios.get('/categories',  { 
            headers: authHeader()
        });
    }

    getOneCategory(id) {
        return axios.get(`/categories/${id}`, { 
            headers: authHeader()
        })
    }

    addCategory(category) {
        return axios.post(`/categories`, {
            name: category.name
        },{
            headers: authHeader()
        })
    }

    updateCategory(id, category) {
        return axios.put(`/categories/${id}`, {
            name: category.name
        },{
            headers: authHeader()
        })
    }

    deleteCategory(id, last_user) {
        return axios.delete(`/categories/${id}`, {
            headers: 
                authHeader()
            ,
            data: {
                last_user: last_user
            }
        })
    }

}

export default new CategoryService();