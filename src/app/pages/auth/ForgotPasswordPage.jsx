import { useRef, useState } from "react";
import AuthService from "../../../setup/services/auth.service";
import { Link } from "react-router-dom";
import FunctionsService from "../../../setup/services/functions.service";
import ReCAPTCHA from "react-google-recaptcha";
import { Player } from "@lottiefiles/react-lottie-player";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState({"email": ""});
  const [result, setResult] = useState({ type: "", message: "" });
  const recaptchaRef = useRef(null);

  const onChangeEmail = (e) => {
    setEmail({"email": e.target.value});
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const token = await recaptchaRef.current.executeAsync();
      await AuthService.forgotPassword({ ...email, token });
      setEmail("");
      setResult({ type: "success", message: "Mail envoyé" });
    } catch (error) {
      setResult({ type: "error", message: error.response.data.message });
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
        ) : (
          <>
            <h1>Mot de passe oublié.</h1>
            <form 
              onSubmit={onSubmitForm}
              >   
              <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input
                  label="Email"
                  type="email"
                  name="email"
                  value={email.email}
                  placeholder="Email"
                  onChange={(e) => {
                    onChangeEmail(e)
                    FunctionsService.labelDisplay(e)
                  }}
                  required
                  />
              </div>
              
              {result.type === "error" && (
                <p className="error">
                  {result.message}
                </p>
              )}

              <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
                  hidden={true}
                  />
              <button type="submit">
                Confirm
              </button>
              <Link 
                to="/auth/signin"
                className="link"
              >
                retour
              </Link>
            </form>
          </>
        )}
      </div>

    </>
  );
};

export default ForgotPasswordPage;