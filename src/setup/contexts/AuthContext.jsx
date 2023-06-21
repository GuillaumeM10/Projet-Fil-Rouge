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
            "range",
            "files",
            "cv",
            "personalPicture",
            "banner",
            "skills",
            "description",
            "school"
        ].includes(name)){
            if (name === "displayedOnFeed") value = e.target.checked;
            if(name === "cities"){
                let cities = []
                e.target.value.forEach(city => {
                    cities.push({"name": city.value})
                });
                value = cities;
            }
            if(name == "files"){
                value = e.target.files;
            };
            if(
                name == "cv"
                || name == "personalPicture"
                || name == "banner"
            ){
                if(!e?.target?.files[0]){
                    value = null;
                }else{
                    let files = new DataTransfer();
                    files.items.add(e?.target?.files[0]);
                    value = files.files;
                }
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