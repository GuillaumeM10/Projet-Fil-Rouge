import { createContext, useEffect, useState } from "react";
import TokenService from "../services/token.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const userFromLocalStorage = async () => {
            if(TokenService.getTokenFromLocalStorage()){
                setUser(await TokenService.getUserInToken(TokenService.getTokenFromLocalStorage()))
            }
        }
        userFromLocalStorage()
    }, [])

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };