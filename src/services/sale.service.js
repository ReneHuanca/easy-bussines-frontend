import axios from '../axios'
import authHeader from './header.service'

class SaleService {
    
    getAllSales() {
        return axios.get(`/sales`, { 
            headers: authHeader() 
        });
    }

    getOneSale(id) {
        return axios.get(`/sales/${id}`, { 
            headers: authHeader() 
        });
    }

    addSale(sale) {
        return axios.post(`/sales`, {
            quantity: sale.quantity,
            total: sale.total,
            product_id: sale.product_id,
            customer_id: sale.customer_id,
        },{
             headers: authHeader() 
        })
    }

    deleteSale(id) {
        return axios.delete(`/sales/${id}`, { 
            headers: authHeader() 
        });
    }
}

export default new SaleService();