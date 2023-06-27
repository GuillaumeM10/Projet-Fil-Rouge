import jwtDecode from 'jwt-decode';

const getUserInToken = (accessToken) => {
    accessToken = accessToken || getTokenFromLocalStorage();
    const user = jwtDecode(accessToken);
    return user;
}

const setTokenInLocalStorage = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
}

const getTokenFromLocalStorage = () => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return null;
    if(!isValidToken(accessToken)) {
        removeTokenFromLocalStorage();
        return null;
    }
    return accessToken;
}

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('accessToken');
}

const isValidToken = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime
}

const TokenService = {
    getUserInToken,
    setTokenInLocalStorage,
    removeTokenFromLocalStorage,
    getTokenFromLocalStorage
}

export default TokenService;