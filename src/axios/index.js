import axios from 'axios'

const apiURL = 'https://project-lumen.herokuapp.com/api/v1'
// const apiURL = 'http://localhost:8000/api/v1'

export default axios.create({
    baseURL: apiURL
})