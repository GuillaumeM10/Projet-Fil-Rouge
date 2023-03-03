import { useContext } from "react";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";

const AuthInputs = ({handleChange, confirmPassword}) => {
  const { labelDisplay } = useContext(ScriptsContext);
  return ( 
    <>

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input 
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
          />
      </div>

      <div className="formGroup">
        <label htmlFor="password">Mot de passe</label>
        <input 
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      {confirmPassword && 
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <input 
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            required
            onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
          />
        </div>
      }
    </>
  );
}

export default AuthInputs ;