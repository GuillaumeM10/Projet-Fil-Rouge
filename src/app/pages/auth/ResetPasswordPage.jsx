import { useContext, useState } from "react";
import AuthService from "../../../setup/services/auth.service";
import { useParams } from "react-router-dom";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({});
  const [result, setResult] = useState({ type: "", message: "" });
  const { labelDisplay } = useContext(ScriptsContext);

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
        await AuthService.resetPassword(token, { password: password.password });
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
              labelDisplay(e)
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
              labelDisplay(e)
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
        <button type="submit">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;