import { useContext } from "react";
import { ScriptsContext } from "../../../setup/contexts/ScriptsContext";

const AuthInputs = ({handleChange, signup}) => {
  const { labelDisplay } = useContext(ScriptsContext);
  let autoComplete = signup ? "new-password" : "on";

  return ( 
    <div className="step step1">
      {signup &&
      <>
        <h1>Inscription</h1>

        <div className="formGroup">
          <label htmlFor="firstName">Prénom</label>
          <input 
            type="text"
            name="firstName"
            placeholder="Prénom"
            // required
            onChange={(e) => {
              handleChange(e)
              labelDisplay(e)
            }}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            // required
            onChange={(e) => {
              handleChange(e)
              labelDisplay(e)
            }}
          />
        </div>
      </>
      }

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input 
            type="email"
            name="email"
            placeholder="Email"
            // required
            autoComplete="username"
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
            // required
            autoComplete={autoComplete}
            onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      {signup && 
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <input 
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            // required
            autoComplete="new-password"
            onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
          />
        </div>
      }

    </div>
  );
}

export default AuthInputs ;