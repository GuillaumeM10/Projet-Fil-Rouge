import React, { useContext, useRef, useState } from 'react';
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
import ReCAPTCHA from "react-google-recaptcha";
import Loading from '../../ui/Loading';

const UserDetailsForm = ({ handleChange, signUpStep, setSignUpStep, loggedIn, toast}) => {
  const { credentials } = useContext(AuthContext);
  const [ sending, setSending ] = useState(false);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  
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
        const token = await recaptchaRef.current.executeAsync();
        let userId = TokenService.getUserInToken();
        userId = userId.id
        await UserService.update(userId, {...userOnly, token})
        setSending(false);
      }catch(e){
        setSending(false);
        toast.error("Une erreur est survenue lors de la mise à jour de votre profil.");
        console.log(e);
      }
    }

    if(credentials.userDetail.files && FunctionsService.filesSizeCheck(credentials.userDetail.files, false, 10000000, setSending) === false) {
      setSending(false)
      return
    }
    if(credentials.userDetail.banner && FunctionsService.filesSizeCheck(credentials.userDetail.banner, false, 2000000, setSending, `La taille totale de la banner ne doit pas dépasser 2mo`) === false) {
      setSending(false)
      return
    }
    if(credentials.userDetail.cv && FunctionsService.filesSizeCheck(credentials.userDetail.cv, false, 2000000, setSending, `La taille totale du cv ne doit pas dépasser 2mo`) === false) {
      setSending(false)
      return
    }
    if(credentials.userDetail.personalPicture && FunctionsService.filesSizeCheck(credentials.userDetail.personalPicture, false, 2000000, setSending, `La taille totale de la photo de profile ne doit pas dépasser 2mo`) === false) {
      setSending(false)
      return
    }

    try{
      // get user from local storage
      const token = await recaptchaRef.current.executeAsync();
      let userDetailId = TokenService.getUserInToken();
      userDetailId = userDetailId.userDetail
      await UserDetailService.update(userDetailId, {...credentials.userDetail, token})
      toast.success("Votre profil a bien été mis à jour !");
      navigate('/account');
      setSending(false);
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
      <>
      {sending && (
        <div 
          className="loading"
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loading />
        </div>
      )}

      <form 
          className={`mainform ${sending ? "formGroupHidden" : ""}`}
          onSubmit={handleSubmitUserDetails}
        >

          {signUpStep === 2 &&
            <Step2 handleChange={handleChange} credentials={credentials} />
          }

          {signUpStep === 3 &&
            <Step3 handleChange={handleChange} credentials={credentials}/>
          }

          {signUpStep === 4 &&
            <Step4 handleChange={handleChange} credentials={credentials} />
          }

          <div 
            className={`btn ${sending ? "hidden" : ""}`}
          >
            {signUpStep !== 2 &&
              <button 
                type="button" 
                onClick={prevStep}
                className='btnPrimary'
              >
                Précédent
              </button>
            }

            {signUpStep === 4 &&
              <>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
                  hidden={true}
                />
                <button type="submit">Valider</button>
              </>
            }

            {signUpStep !== 4 &&
              <button 
                type="button" 
                onClick={nextStep}
                className='btnPrimary'
              >
                Suivant
              </button>
            }
          </div>

        </form>
      
      </>
    ) : (
      <div className="loading">
        <Loading />
      </div>
    )}

    </>
  );
};

export default UserDetailsForm;