import { useEffect } from "react";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../setup/contexts/AuthContext";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";
import UserDetailsForm from "./signUp/UserDetailsForm";
import UserForm from "./signUp/UserForm";

const SignupForm = () => {
  const { credentials, handleChange } = useContext(AuthContext);
  const { labelDisplay } = useContext(ScriptsContext);
  const [ displayedError, setDisplayedError ] = useState(null);
  const [signUpStep, setSignUpStep ] = useState(1);
  // const navigate = useNavigate();

  useEffect(() => {
    console.log(signUpStep);
  }, [signUpStep])

  return ( 
    <div className="signUpContainer">
    { signUpStep === 1 &&
      <UserForm credentials={credentials} handleChange={handleChange} setSignUpStep={setSignUpStep} toast={toast} setDisplayedError={setDisplayedError} labelDisplay={labelDisplay} />
    }

    { signUpStep !== 1 &&
      <UserDetailsForm handleChange={handleChange} labelDisplay={labelDisplay} setSignUpStep={setSignUpStep} signUpStep={signUpStep} />
    }

    { displayedError && <div className="error">{ displayedError }</div> }
    <Toaster />
    </div>
  );
}

export default SignupForm;