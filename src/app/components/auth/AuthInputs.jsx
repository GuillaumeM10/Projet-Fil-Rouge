const AuthInputs = ({handleChange, confirmPassword}) => {
  return ( 
    <>

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input 
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
      </div>

      <div className="formGroup">
        <label htmlFor="password">Mot de passe</label>
        <input 
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
      }
    </>
  );
}

export default AuthInputs ;