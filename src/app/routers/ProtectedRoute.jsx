import { Navigate } from "react-router-dom";
import TokenService from "../../setup/services/token.service";

const ProtectedRoute = ({ children, to, bool }) => {
    let acccessToken = TokenService.getTokenFromLocalStorage();

    if (acccessToken) acccessToken = true 
    else acccessToken = false

    if(acccessToken === bool) return <Navigate to={to} />;

    return children;
}

export default ProtectedRoute;