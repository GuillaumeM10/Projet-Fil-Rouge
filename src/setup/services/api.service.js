import axios from "axios"

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
        
        if (config.formData){
            config.headers['Content-Type'] = 'multipart/form-data'
        }

        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default api