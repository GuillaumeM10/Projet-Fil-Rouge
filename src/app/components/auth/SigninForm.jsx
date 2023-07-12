import { 
    useContext,
    useRef,
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
import ReCAPTCHA from "react-google-recaptcha";
import Loading from "../ui/Loading";

const SigninForm = () => {
    const { credentials, handleChange } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const [ displayedError, setDisplayedError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const recaptchaRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = await recaptchaRef.current.executeAsync();
            const { accessToken } = await AuthService.signin({ ...credentials, token });
            TokenService.setTokenInLocalStorage(accessToken);
            const user = TokenService.getUserInToken(accessToken);
            setUser(user)

            toast.success("Connexion réussie.");
            setIsLoading(false)
            navigate("/")

        } catch (error) {
            setDisplayedError(error.response.data.message);

            toast.error(error.response.data.message);
            setIsLoading(false);
            console.log(error);
        }
    }

    // useEffect(() => {
    //     console.log(displayedError);
    // }, [displayedError])
    
    return ( 
        <form className={`mainform reverseInput ${isLoading ? "formGroupHidden" : ""}`} onSubmit={handleSubmit}>
            { isLoading && 
                <div className="loading">
                    <Loading />
                </div>
            }
            <h1
                className={isLoading ? "hidden" : ""}
            >
                <span className="text">Connexion</span>
                <span className="hover-bar hover-1"></span>
                <span className="hover-bar hover-2"></span>
                <span className="hover-bar hover-3"></span>
                <span className="hover-bar hover-4"></span>
            </h1>
            <AuthInputs handleChange={handleChange} confirmPassword={false} />
            { displayedError && <div
                className={isLoading ? "hidden" : "error"}
            >{ displayedError }</div> }

            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
                hidden={true}
            />

            <button 
                type="submit"
                className={isLoading ? "hidden" : ""}
            >CONNEXION</button>
            <Link 
                to='/forget-password'
                className={isLoading ? "hidden" : ""}
            >Mot de passe oublié ?</Link>
        </form>
    );
}

export default SigninForm;