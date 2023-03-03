import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../setup/contexts/UserContext";

const ProtectedRoute = ({children}) => {
    const { user } = useContext(UserContext);

    if(!user.email) return <Navigate to="/auth/signin" />;

    return children;
}
 
export default ProtectedRoute;