import React from 'react';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const UserDetailsForm = ({ handleChange, labelDisplay, signUpStep, setSignUpStep, setCredentials}) => {
  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();
  }

  const nextStep = () => {
    setSignUpStep(signUpStep + 1);
  }

  const prevStep = () => {
    setSignUpStep(signUpStep - 1);
  }

  return (
    <form onSubmit={handleSubmitUserDetails}>

      {signUpStep === 2 &&
        <Step2 handleChange={handleChange} labelDisplay={labelDisplay} setCredentials={setCredentials} />
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
  );
};

export default UserDetailsForm;