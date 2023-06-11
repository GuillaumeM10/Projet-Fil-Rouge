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
    setCredentials
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

    console.log(e);
    e.preventDefault();
    // checkConfirmPassword()

    setSignUpStep(2);
    if (checkConfirmPassword()) { 
      try {
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
        if(newCredentials.email){
          await AuthService.signup(newCredentials);
        }else{
          await AuthService.signup(credentials);
        }
        
        //login
        const { accessToken } = await AuthService.signin({'email': credentials.email, 'password': credentials.password});
        TokenService.setTokenInLocalStorage(accessToken);
        const user = TokenService.getUserInToken(accessToken);
        localStorage.setItem('signUpUserDetails', true);

        setUser(user)
        
        //message
        toast.success("Votre compte a bien été créé !");

      } catch (error) {
        setDisplayedError(error.response.data.message);

        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <form className='mainform signUpForm' onSubmit={handleSubmitUser}>
      <AuthInputs handleChange={handleChange} signup={true} />

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

      <button type="submit">INSCRIPTION</button>
    </form>
  );
};

export default UserForm;