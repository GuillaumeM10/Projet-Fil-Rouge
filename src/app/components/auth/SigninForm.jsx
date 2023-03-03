import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../setup/contexts/AuthContext";
import { UserContext } from "../../../setup/contexts/UserContext";
import AuthService from "../../../setup/services/auth.service";
import TokenService from "../../../setup/services/token.service";
import AuthInputs from "./AuthInputs";

const SigninForm = () => {
    const { credentials, handleChange } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(credentials);
            const { accessToken } = await AuthService.signin(credentials);
            TokenService.setTokenInLocalStorage(accessToken);
            const user = TokenService.getUserInToken(accessToken);
            setUser(user)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <AuthInputs handleChange={handleChange} confirmPassword={false} />

            <button type="submit">CONNEXION</button>
        </form>
    );
}

export default SigninForm;