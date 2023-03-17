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

const forgotPassword = async (data) => {
    const response = await api.post(`${ENDPPOINT}/forgot-password`, data);
    return response.data;
};

const resetPassword = async (token, data) => {
    const response = await api.post(`${ENDPPOINT}/reset-password/${token}`, data);
    return response.data;
};

const AuthService = {
    signup,
    signin,
    forgotPassword,
    resetPassword
}

export default AuthService