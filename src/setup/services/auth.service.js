import api from "./api.service"


const ENDPPOINT = "/auth"

const signin = async (credentials) => {
    const response = await api.post(`${ENDPPOINT}/signin`, credentials)
    return response.data
}

const signup = async (credentials) => {
    const response = await api.post(`${ENDPPOINT}/signup`, credentials)
    return response.data
}

const AuthService = {
    signup,
    signin
}

export default AuthService