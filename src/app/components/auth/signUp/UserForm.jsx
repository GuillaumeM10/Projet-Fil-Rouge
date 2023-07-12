import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../../../setup/contexts/UserContext';
import AuthService from '../../../../setup/services/auth.service';
import TokenService from '../../../../setup/services/token.service';
import AuthInputs from '../AuthInputs';
import ReCAPTCHA from "react-google-recaptcha";
import Loading from '../../ui/Loading';

const UserForm = ({
    credentials, 
    handleChange, 
    setSignUpStep, 
    toast, 
    setDisplayedError,
    setLoggedIn
  }) => {
  const { setUser } = useContext(UserContext);
  const recaptchaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkConfirmPassword = () => {
    if (credentials.password !== credentials.confirmPassword) {
      setDisplayedError("Les mots de passe ne correspondent pas");
      return false;
    } else {
      setDisplayedError(null);
      return true;
    }
  }

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (checkConfirmPassword()) { 
        let newCredentials
        if(credentials.userDetail === undefined){
          newCredentials = {
            ...credentials, 
            'userDetail': {
              ...credentials.userDetails, 
              'displayedOnFeed': true
            }
          }
        }
        if(newCredentials?.email && credentials.userDetail === undefined){
          try {
            const token = await recaptchaRef.current.executeAsync();
            await AuthService.signup({...newCredentials, token}).then(async (response) => {
              //login
              console.log('login in');
              const { accessToken } = await AuthService.signin({'email': credentials.email, 'password': credentials.password});
              TokenService.setTokenInLocalStorage(accessToken);
              const user = TokenService.getUserInToken(accessToken);
              localStorage.setItem('signUpUserDetails', true);

              setUser(user)
              setLoggedIn(true)
              setIsLoading(false)
              //message
              toast.success("Votre compte a bien été créé !");
              setSignUpStep(2);
            });
            
          } catch (error) {
            setIsLoading(false)
            console.log(error);
            setDisplayedError(error.response.data.message);
            toast.error(error.response.data.message);
          }
        }else{
          try {
            const token = await recaptchaRef.current.executeAsync();
            await AuthService.signup({...credentials, token}).then(async (response) => {
              //login
              const { accessToken } = await AuthService.signin({'email': credentials.email, 'password': credentials.password});
              TokenService.setTokenInLocalStorage(accessToken);
              const user = TokenService.getUserInToken(accessToken);
              localStorage.setItem('signUpUserDetails', true);

              setUser(user)
              setLoggedIn(true)
              setIsLoading(false)
              //message
              toast.success("Votre compte a bien été créé !");
              setSignUpStep(2);
            });

          } catch (error) {
            console.log(error);
            setDisplayedError(error.response.data.message);
            setIsLoading(false)
            toast.error(error.response.data.message);
          }
        }
      
    }
  }

  return (
    <form className={`mainform signUpForm ${isLoading ? "formGroupHidden" : ""}`} onSubmit={handleSubmitUser}>
      {isLoading && (
        <div 
          className="loading"
          style={{
            height: "50vh",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loading />
        </div>
      )}
      
      <AuthInputs 
        handleChange={handleChange} 
        signup={true}
        isLoading={isLoading}
      />

      <label 
        className={`checkboxContainer ${isLoading ? "hidden" : ""}`} 
        htmlFor="displayedOnFeed"
      >
        <span>
          Etre affiché dans le feed (oui par défaut)
        </span>
      
        <span className="animation">

          <input
            type="checkbox"
            name="displayedOnFeed"
            placeholder="Je souhaite être visible sur le feed"
            defaultChecked={true}
            id='displayedOnFeed'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <span className="handle"></span>
        </span>
      </label>
      <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
          hidden={true}
      />
      <button 
        type="submit"
        className={`${isLoading ? "hidden" : ""}`}
      >INSCRIPTION</button>
    </form>
  );
};

export default UserForm;