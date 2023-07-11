import { useRef, useState } from "react";
import AuthService from "../../../setup/services/auth.service";
import { useParams } from "react-router-dom";
import FunctionsService from "../../../setup/services/functions.service";
import ReCAPTCHA from "react-google-recaptcha";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({});
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

  // useEffect(() => {
  //   console.log(password);
  // }, [password]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      if(password.password === password.cpassword) {
        const gtoken = await recaptchaRef.current.executeAsync();
        await AuthService.resetPassword(token, { password: password.password, gtoken });
        setPassword("");
        setResult({
          type: "success",
          message: "Password reset successfully",
        });
      } else {
        setResult({
          type: "error",
          message: "Passwords do not match",
        });
      }
    } catch (error) {
      setResult({ type: "error", message: error.response.data.message });
    }
  };
  
  return (
    <div>
      <h1>Reset password form</h1>
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
        {result.type === "success" && (
          <p>
            {result.message}
          </p>
        )}
        {result.type === "error" && (
          <p>
            {result.message}
          </p>
        )}

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
          hidden="true"
        />

        <button type="submit">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;