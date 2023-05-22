import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../setup/contexts/AuthContext";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";
import AuthService from "../../../setup/services/auth.service";
import AuthInputs from "./AuthInputs";

const SignupForm = () => {
  const { credentials, setCredentials, handleChange } = useContext(AuthContext);
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
        console.log(credentials);
        await AuthService.signup(credentials);
        
        toast.success("Votre compte a bien été créé !");

        setTimeout(() => {
          navigate("/auth/signin", { replace: true })
        }, 1000);

      } catch (error) {
        setDisplayedError(error.response.data.message);

        toast.error(error.response.data.message);
      }
    }
  }

  const rendomValues = () => {
    const random = () => {return Math.floor(Math.random() * 1000000000)};
    const randomLetters = () => {return Math.random().toString(36).substring(7)};
    
    const randomEmail = `${randomLetters()}@${randomLetters()}.com`
    const randomPassword = `${randomLetters()}${random()}`
    const randomFirstName = `${random()}`
    const randomLastName = `${random()}`
    const randomFormation = `${random()}`
    const randomCountry = `${random()}`
    const randomStatus = `${random()}`

    document.querySelector('input[name="email"]').value = randomEmail;
    document.querySelector('input[name="password"]').value = randomPassword;
    document.querySelector('input[name="confirmPassword"]').value = randomPassword;
    document.querySelector('input[name="firstName"]').value = randomFirstName;
    document.querySelector('input[name="lastName"]').value = randomLastName;
    document.querySelector('input[name="formation"]').value = randomFormation;
    document.querySelector('input[name="country"]').value = randomCountry;
    document.querySelector('input[name="status"]').value = randomStatus;

    setCredentials({
      "email": randomEmail,
      "password": randomPassword,
      "confirmPassword": randomPassword,
      "firstName": randomFirstName,
      "lastName": randomLastName,
      "userDetail": {
          "formation": randomFormation,
          "country": randomCountry,
          "status": randomStatus,
      }
    })
    
    console.log(credentials);
    // document.querySelector('input[name="displayedOnFeed"]').value = randomDisplayedOnFeed;
  }


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
        {/* <input
          type="text"
          name="country"
          placeholder="Pays"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        /> */}
        <select
          name="country"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        >
          <option value="">Choisir un pays</option>
          {countries.map((country, index) => {
            return <option key={index} value={country}>{country}</option>
          })}
        </select>
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
      <a onClick={() => rendomValues()}>reandom values</a>
      <Toaster />
    </form>
  );
}

export default SignupForm;