import React, { useContext } from 'react';
import { AuthContext } from '../../../../setup/contexts/AuthContext';
import { UserContext } from '../../../../setup/contexts/UserContext';
import UserDetailService from '../../../../setup/services/userDetail.service';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const UserDetailsForm = ({ handleChange, labelDisplay, signUpStep, setSignUpStep, loggedIn}) => {
  // get user from context
  const { credentials } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  
  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();
    console.log('userdetails', credentials.userDetail);
    console.log('user', user.id);

    try{
      const response = await UserDetailService.update(user.id, credentials.userDetail)
      console.log(response);
    }catch(e){
      console.log(e);
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
      <form onSubmit={handleSubmitUserDetails}>

        {signUpStep === 2 &&
          <Step2 handleChange={handleChange} labelDisplay={labelDisplay} credentials={credentials} />
        }

        {signUpStep === 3 &&
          <Step3 handleChange={handleChange} labelDisplay={labelDisplay} />
        }

        {signUpStep === 4 &&
          <Step4 handleChange={handleChange} />
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
    ) : (
      <div>Chargement</div>
    )}

    </>
  );
};

export default UserDetailsForm;