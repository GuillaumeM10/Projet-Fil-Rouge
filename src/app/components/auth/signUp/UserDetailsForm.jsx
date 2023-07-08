import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../setup/contexts/AuthContext';
// import { UserContext } from '../../../../setup/contexts/UserContext';
import UserDetailService from '../../../../setup/services/userDetail.service';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useNavigate } from 'react-router-dom';
import TokenService from '../../../../setup/services/token.service';
import FunctionsService from '../../../../setup/services/functions.service';
import UserService from '../../../../setup/services/user.service';

const UserDetailsForm = ({ handleChange, signUpStep, setSignUpStep, loggedIn, toast}) => {
  // get user from context
  const { credentials } = useContext(AuthContext);
  // const { user } = useContext(UserContext);
  const [ sending, setSending ] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();
    setSending(true);

    if(credentials.lastName 
      || credentials.firstName 
      || credentials.email 
      || credentials.password 
      || credentials.passwordConfirm 
    ){
      let userOnly = {
        lastName: credentials.lastName,
        firstName: credentials.firstName,
        email: credentials.email,
        password: credentials.password,
        passwordConfirm: credentials.passwordConfirm
      };
      try{
        let userId = TokenService.getUserInToken();
        userId = userId.id
        await UserService.update(userId, userOnly)
      }catch(e){
        toast.error("Une erreur est survenue lors de la mise à jour de votre profil.");
        console.log(e);
        setSending(false);
      }
    }

    if(credentials.userDetail.files && FunctionsService.filesSizeCheck(credentials.userDetail.files, false, 10000000, setSending) === false) return
    if(credentials.userDetail.banner && FunctionsService.filesSizeCheck(credentials.userDetail.banner, false, 2000000, setSending, `La taille totale de la banner ne doit pas dépasser 2mo`) === false) return
    if(credentials.userDetail.cv && FunctionsService.filesSizeCheck(credentials.userDetail.cv, false, 2000000, setSending, `La taille totale du cv ne doit pas dépasser 2mo`) === false) return
    if(credentials.userDetail.personalPicture && FunctionsService.filesSizeCheck(credentials.userDetail.personalPicture, false, 2000000, setSending, `La taille totale de la photo de profile ne doit pas dépasser 2mo`) === false) return

    try{
      // get user from local storage
      let userDetailId = TokenService.getUserInToken();
      userDetailId = userDetailId.userDetail
      await UserDetailService.update(userDetailId, credentials.userDetail)
      toast.success("Votre profil a bien été mis à jour !");
      setTimeout(() => {
        setSending(false);
        navigate('/account');
      }, 1000);
    }catch(e){
      toast.error("Une erreur est survenue lors de la mise à jour de votre profil.");
      console.log(e);
      setSending(false);

    }
  }

  const nextStep = () => {
    setSignUpStep(signUpStep + 1);
  }

  const prevStep = () => {
    setSignUpStep(signUpStep - 1);
  }

  return (
    <>
    {loggedIn ? (
      !sending ? (
        <form onSubmit={handleSubmitUserDetails}>

          {signUpStep === 2 &&
            <Step2 handleChange={handleChange} credentials={credentials} />
          }

          {signUpStep === 3 &&
            <Step3 handleChange={handleChange} credentials={credentials}/>
          }

          {signUpStep === 4 &&
            <Step4 handleChange={handleChange} credentials={credentials} />
          }

          <div className="btn">
            {signUpStep !== 2 &&
              <button type="button" onClick={prevStep}>Précédent</button>
            }

            {signUpStep === 4 &&
              <button type="submit">Valider</button>
            }

            {signUpStep !== 4 &&
              <button type="button" onClick={nextStep}>Suivant</button>
            }
          </div>

        </form>
      ): (
        <div>
          <img className='loading' src="/img/loading.svg" alt="" />
        </div>
      )
      
    ) : (
      <div>
        <img className='loading' src="/img/loading.svg" alt="" />
      </div>
    )}

    </>
  );
};

export default UserDetailsForm;