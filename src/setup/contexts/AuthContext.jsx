import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({})

    const handleChange = (e) => {
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

    return (
        <AuthContext.Provider value={{
            credentials,
            handleChange
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };