import { useContext, useState } from "react";
import AuthService from "../../../setup/services/auth.service";
import { Link } from "react-router-dom";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState({ type: "", message: "" });
  const { labelDisplay } = useContext(ScriptsContext);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await AuthService.forgotPassword({ email });
      setEmail("");
      setResult({ type: "success", message: "mail sent" });
    } catch (error) {
      setResult({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <div>
      <h1>Forget password</h1>
      <form 
        onSubmit={onSubmitForm}
      >   
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              onChangeEmail(e)
              labelDisplay(e)
            }}
            required
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
          Confirm
        </button>
        <Link 
          to="/auth/signin"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;