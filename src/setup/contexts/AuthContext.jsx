import { createContext, useEffect, useState } from "react";
import TokenService from "../services/token.service";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({})
    const [token, setToken] = useState(null)

    const handleChange = (e) => {
        console.log(credentials);
        let { name, value } = e.target;

        if(["status", "formation", "country", "displayedOnFeed"].includes(name)){
            if (name === "displayedOnFeed") value = e.target.checked;
            setCredentials({
                ...credentials,
                "userDetail":{
                    ...credentials.userDetail,
                    [name]: value
                }
            })
        }else{
            setCredentials({
                ...credentials,
                [name]: value
            })
        }
    }

    useEffect(() => {
        setToken(TokenService.getTokenFromLocalStorage())
    }, [])

    return (
        <AuthContext.Provider value={{
            credentials,
            setCredentials,
            handleChange,
            token
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };