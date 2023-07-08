import React, { useContext } from 'react';
import { UserContext } from '../../../../setup/contexts/UserContext';
import AuthService from '../../../../setup/services/auth.service';
import TokenService from '../../../../setup/services/token.service';
import AuthInputs from '../AuthInputs';

const UserForm = ({
    credentials, 
    handleChange, 
    setSignUpStep, 
    toast, 
    setDisplayedError,
    setLoggedIn
  }) => {
  const { setUser } = useContext(UserContext);

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
            
            await AuthService.signup(newCredentials).then(async (response) => {
              //login
              console.log('login in');
              const { accessToken } = await AuthService.signin({'email': credentials.email, 'password': credentials.password});
              TokenService.setTokenInLocalStorage(accessToken);
              const user = TokenService.getUserInToken(accessToken);
              localStorage.setItem('signUpUserDetails', true);

              setUser(user)
              setLoggedIn(true)
              
              //message
              toast.success("Votre compte a bien été créé !");
              setSignUpStep(2);
            });
            
          } catch (error) {
            console.log(error);
            setDisplayedError(error.response.data.message);

            toast.error(error.response.data.message);
          }
        }else{
          try {
            await AuthService.signup(credentials).then(async (response) => {
              //login
              const { accessToken } = await AuthService.signin({'email': credentials.email, 'password': credentials.password});
              TokenService.setTokenInLocalStorage(accessToken);
              const user = TokenService.getUserInToken(accessToken);
              localStorage.setItem('signUpUserDetails', true);

              setUser(user)
              setLoggedIn(true)
              
              //message
              toast.success("Votre compte a bien été créé !");
              setSignUpStep(2);
            });

          } catch (error) {
            console.log(error);
            setDisplayedError(error.response.data.message);

            toast.error(error.response.data.message);
          }
        }
      
    }
  }

  return (
    <form className='mainform signUpForm' onSubmit={handleSubmitUser}>
      <AuthInputs handleChange={handleChange} signup={true} />

      <label className="checkboxContainer" htmlFor="displayedOnFeed">
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

      <button type="submit">INSCRIPTION</button>
    </form>
  );
};

export default UserForm;