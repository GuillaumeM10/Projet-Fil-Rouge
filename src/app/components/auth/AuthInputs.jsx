import FunctionsService from "../../../setup/services/functions.service";

const AuthInputs = ({handleChange, signup, isLoading = false}) => {
  let autoComplete = signup ? "new-password" : "on";

  return ( 
    <div className={`step step1 reverseInput ${isLoading ? "hidden" : ""}`}>
      {signup &&
      <>
        <h1>
          <span className="text">Inscription</span>
          <span className="hover-bar hover-1"></span>
          <span className="hover-bar hover-2"></span>
          <span className="hover-bar hover-3"></span>
          <span className="hover-bar hover-4"></span>
        </h1>

        <div className="formGroup">
          <label htmlFor="firstName">Prénom</label>
          <input 
            type="text"
            name="firstName"
            placeholder="Prénom"
            // required
            onChange={(e) => {
              handleChange(e)
              FunctionsService.labelDisplay(e)
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
              FunctionsService.labelDisplay(e)
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
            FunctionsService.labelDisplay(e)
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
            FunctionsService.labelDisplay(e)
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
            FunctionsService.labelDisplay(e)
          }}
          />
        </div>
      }

    </div>
  );
}

export default AuthInputs ;