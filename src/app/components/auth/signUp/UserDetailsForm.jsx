import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../setup/contexts/AuthContext';
import { UserContext } from '../../../../setup/contexts/UserContext';
import UserDetailService from '../../../../setup/services/userDetail.service';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useNavigate } from 'react-router-dom';

const UserDetailsForm = ({ handleChange, signUpStep, setSignUpStep, loggedIn, toast}) => {
  // get user from context
  const { credentials } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [ sending, setSending ] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();
    setSending(true);

    try{
      await UserDetailService.update(user.userDetail, credentials.userDetail)
      toast.success("Votre profil a bien été mis à jour !");
      setTimeout(() => {
        // navigate('/account');
        setSending(false);
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
    {/* {loggedIn ? ( */}
      {!sending ? (
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
      )}
      
    {/* ) : (
      <div>
        <img className='loading' src="/img/loading.svg" alt="" />
      </div>
    )} */}

    </>
  );
};

export default UserDetailsForm;