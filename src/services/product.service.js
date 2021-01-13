import axios from '../axios'
import authHeader from './header.service'

class ProductService {
    
    getAllProducts() {
        return axios.get(`/products`, { 
            headers: authHeader() 
        });
    }

    getOneProduct(id) {
        return axios.get(`/products/${id}`, { 
            headers: authHeader() 
        });
    }

    addProduct(product) {
        return axios.post(`/products`, {
            name: product.name,
            quantity: product.quantity,
            unit_price: product.unit_price,
            total_in_stock: product.total_in_stock,
            category_id: product.category_id,
        },{
             headers: authHeader() 
        })
    }

    updateProduct(id, product) {
        return axios.put(`/products/${id}`, {
            name: product.name,
            quantity: product.quantity,
            unit_price: product.unit_price,
            total_in_stock: product.total_in_stock,
            category_id: product.category_id,
        },{ 
            headers: authHeader() 
        })
    }

    deleteProduct(id) {
        return axios.delete(`/products/${id}`, { 
            headers: authHeader() 
        });
    }
}

export default new ProductService();