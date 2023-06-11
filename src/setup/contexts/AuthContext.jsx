import { createContext, useEffect, useState } from "react";
import TokenService from "../services/token.service";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({})
    const [token, setToken] = useState(null)

    const handleChange = (e) => {
        let { name, value } = e.target;
        
        if([
            "status", 
            "formation", 
            "country", 
            "displayedOnFeed",
            "contactEmail",
            "phone",
            "cities",
            "range"
        ].includes(name)){
            if (name === "displayedOnFeed") value = e.target.checked;
            if(name === "cities"){
                let cities = []
                e.target.value.forEach(city => {
                    cities.push({"name": city.value})
                });
                value = cities;
            }
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
        console.log(credentials);
    }, [credentials])
    
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