import { useEffect } from "react";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../setup/contexts/AuthContext";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";
import UserDetailsForm from "./signUp/UserDetailsForm";
import UserForm from "./signUp/UserForm";

const SignupForm = () => {
  const { setCredentials, credentials, handleChange } = useContext(AuthContext);
  const { labelDisplay } = useContext(ScriptsContext);
  const [ displayedError, setDisplayedError ] = useState(null);
  const [signUpStep, setSignUpStep ] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    setCredentials({});
  }, []);

  return ( 
    <div className="signUpContainer">
    { signUpStep === 1 &&
      <UserForm 
        setCredentials={setCredentials} 
        credentials={credentials} 
        handleChange={handleChange} 
        setSignUpStep={setSignUpStep} 
        toast={toast} 
        setDisplayedError={setDisplayedError} 
        labelDisplay={labelDisplay} 
        setLoggedIn={setLoggedIn}
      />
    }

    { signUpStep !== 1 &&
      <UserDetailsForm 
        handleChange={handleChange} 
        labelDisplay={labelDisplay} 
        setSignUpStep={setSignUpStep} 
        signUpStep={signUpStep} 
        setCredentials={setCredentials} 
        credientials={credentials} 
        toast={toast}
        loggedIn={loggedIn}
      />
    }

    { displayedError && <div className="error">{ displayedError }</div> }
    <Toaster />
    </div>
  );
}

export default SignupForm;