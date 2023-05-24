import { Navigate } from "react-router-dom";
import TokenService from "../../setup/services/token.service";

const ProtectedRoute = ({ children, to, bool }) => {
    //get info from localstorage
    const signUpUserDetails = localStorage.getItem('signUpUserDetails');

    let acccessToken = TokenService.getTokenFromLocalStorage();

    if (acccessToken) acccessToken = true 
    else acccessToken = false

    if(acccessToken === bool && !signUpUserDetails) return <Navigate to={to} />;

    return children;
}

export default ProtectedRoute;