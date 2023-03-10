import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../setup/contexts/AuthContext";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";
import AuthService from "../../../setup/services/auth.service";
import AuthInputs from "./AuthInputs";

const SignupForm = () => {
  const { credentials, handleChange } = useContext(AuthContext);
  const { labelDisplay } = useContext(ScriptsContext);
  const [ displayedError, setDisplayedError ] = useState(null);
  const navigate = useNavigate();

  const checkConfirmPassword = () => {
    if (credentials.password !== credentials.confirmPassword) {
      setDisplayedError("Les mots de passe ne correspondent pas");
      return false;
    } else {
      setDisplayedError(null);
      return true;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkConfirmPassword()
    if (checkConfirmPassword()) { 
      try {
        await AuthService.signup(credentials);
        navigate("/auth/signin")
      } catch (error) {
        setDisplayedError(error.response.data.message);
      }
    }
  }

  // useEffect(() => {
  //   console.log(displayedError);
  // }, [displayedError])

  return ( 
    <form className='mainform' onSubmit={handleSubmit}>
      <h1>Inscription</h1>

      <AuthInputs handleChange={handleChange} confirmPassword={true} />

      <div className="formGroup">
        <label htmlFor="firstName">Prénom</label>
        <input 
          type="text"
          name="firstName"
          placeholder="Prénom"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="formation">Formation</label>
        <input
          type="text"
          name="formation"
          placeholder="Formation"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="country">Pays</label>
        <input
          type="text"
          name="country"
          placeholder="Pays"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="status">Status</label>
        <input
          type="text"
          name="status"
          placeholder="Statut"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div style={{ 
          display: 'flex', 
          flexDirection: 'column'
        }}>
        <label htmlFor="displayedOnFeed">Etre affiché dans le feed (oui par défaut)</label>
        <input
          type="checkbox"
          name="displayedOnFeed"
          placeholder="Je souhaite être visible sur le feed"
          defaultChecked={true}
          onChange={(e) => {
            handleChange(e)
          }}
        />
      </div>
      { displayedError && <div className="error">{ displayedError }</div> }

      <button type="submit">INSCRIPTION</button>
    </form>
  );
}

export default SignupForm;