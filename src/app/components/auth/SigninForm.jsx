import { 
    useContext,
    // useEffect, 
    useState 
} from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../setup/contexts/AuthContext";
import { UserContext } from "../../../setup/contexts/UserContext";
import AuthService from "../../../setup/services/auth.service";
import TokenService from "../../../setup/services/token.service";
import AuthInputs from "./AuthInputs";

const SigninForm = () => {
    const { credentials, handleChange } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const [ displayedError, setDisplayedError ] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken } = await AuthService.signin(credentials);
            TokenService.setTokenInLocalStorage(accessToken);
            const user = TokenService.getUserInToken(accessToken);
            setUser(user)

            toast.success("Connexion réussie.");

            setTimeout(() => {
                navigate("/")
            }, 1000);

        } catch (error) {
            setDisplayedError(error.response.data.message);

            toast.error(error.response.data.message);

            console.log(error);
        }
    }

    // useEffect(() => {
    //     console.log(displayedError);
    // }, [displayedError])
    
    return ( 
        <form className="mainform" onSubmit={handleSubmit}>
            <h1>Connexion</h1>
            <AuthInputs handleChange={handleChange} confirmPassword={false} />
            { displayedError && <div className="error">{ displayedError }</div> }

            <button type="submit">CONNEXION</button>
            <Link to='/forget-password'>Mot de passe oublié ?</Link>
        </form>
    );
}

export default SigninForm;