import axios from '../axios'
import authHeader from './header.service'

class UserService
{

    // getAllCategories() {
    //     return axios.get('/categories',  { 
    //         headers: authHeader()
    //     });
    // }

    // getOneCategory(id) {
    //     return axios.get(`/categories/${id}`, { 
    //         headers: authHeader()
    //     })
    // }

    // addCategory(category) {
    //     return axios.post(`/categories`, {
    //         name: category.name,
    //         last_user: category.last_user,
    //         state: category.state
    //     },{
    //         headers: authHeader()
    //     })
    // }

    updateUser(id, user) {
        return axios.put(`/users/${id}`, {
            name: user.name,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            city: user.city,
            country: user.country,
            about_me: user.about_me,
            phone: user.phone,
            email: user.email,
            last_user: user.last_user
            // password: password
            // password_confirmation: "";
        },{
            headers: authHeader()
        })
    }

    // deleteCategory(id, last_user) {
    //     return axios.delete(`/categories/${id}`, {
    //         headers: 
    //             authHeader()
    //         ,
    //         data: {
    //             last_user: last_user
    //         }
    //     })
    // }

}

export default new UserService();