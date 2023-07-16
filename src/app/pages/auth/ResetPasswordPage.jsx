import { useRef, useState } from "react";
import AuthService from "../../../setup/services/auth.service";
import { useParams } from "react-router-dom";
import FunctionsService from "../../../setup/services/functions.service";
import ReCAPTCHA from "react-google-recaptcha";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-hot-toast";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({});
  const [error, setError] = useState("");
  const [result, setResult] = useState({ type: "", message: "" });
  const recaptchaRef = useRef(null);

  const onChangePassword = (e) => {
    // setPassword(e.target.value);
    const {name, value} = e.target;
    setPassword({
        ...password,
        [name]: value
    })
  };

  const checkPassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    if (password?.password === "" || !password?.password) {
      toast.error("Veuillez renseigner un mot de passe");
      setError("Veuillez renseigner un mot de passe");
      return false;
    } else if (password?.password?.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères", true);
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    } else if(password?.password?.length >= 6 && !regex.test(password?.password)){
      toast.error("Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial");
      setError("Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial");
      return false;
    }else if(password.password !== password.cpassword){
      toast.error("Les mots de passe ne correspondent pas");
      setError("Les mots de passe ne correspondent pas");
      return false;
    }else{
      setError(null);
      return true;
    }
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      if(
        checkPassword()
      ) {
        const gtoken = await recaptchaRef.current.executeAsync();
        await AuthService.resetPassword(token, { password: password.password, gtoken });
        setPassword("");
        toast.success("Mot de passe changé.");
        setResult({
          type: "success",
          message: "Mot de passe changé.",
        });
      } 
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  
  return (
    <>
      <div className="bg">
        <Player
          autoplay
          loop
          src="/Dark_royal_background.json"
          className='player'
          style={{ height: '100vh', width: '100%' }}
        />
      </div>

      <div className="formContainer">

      {result.type === "success" ? (
        <p>
          {result.message}
        </p>
      ): (
        <>
          <h1>Modifier mon mot de passe.</h1>
          <form onSubmit={onSubmitForm}>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  onChangePassword(e)
                  FunctionsService.labelDisplay(e)
                }}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="cpassword">Confirm password</label>
              <input
                label="Confirm password"
                type="password"
                name="cpassword"
                placeholder="Confirm password"
                onChange={(e) => {
                  onChangePassword(e)
                  FunctionsService.labelDisplay(e)
                }}
              />
            </div>
            
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
              hidden={true}
            />

            <button type="submit">
              Modifier
            </button>

            {error && (
              <p className="error">{error}</p>
            )}
          </form>
        </>
      )}
      </div>
    </>
  );
};

export default ResetPasswordPage;