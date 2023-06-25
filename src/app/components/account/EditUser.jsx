import React, { useContext } from 'react';
import { UserContext } from '../../../setup/contexts/UserContext';
import FunctionsService from '../../../setup/services/functions.service';

const EditUser = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <form>
      <div className="formGroup">
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder='Prénom'
          value={user.firstName}
          onChange={(e) => {
            setUser({ ...user, firstName: e.target.value })
            FunctionsService.labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={user.lastName}
          placeholder='Nom'
          onChange={
            (e) => {
              setUser({ ...user, lastName: e.target.value })
              FunctionsService.labelDisplay(e)
            }}
        />
      </div>

      <div className="formGroup">
      <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          placeholder='Email'
          onChange={(e) => {
            setUser({ ...user, email: e.target.value })
            FunctionsService.labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="profilePicture">Photo de profil</label>
        <input
          type="file"
          name="profilePicture"
          id="profilePicture"
          onChange={(e) => {
            setUser({ ...user, profilePicture: e.target.files[0] })
            FunctionsService.labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder='Mot de passe'
          onChange={(e) => {
            setUser({ ...user, password: e.target.value })
            FunctionsService.labelDisplay(e)
        }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder='Confirmer le mot de passe'
          onChange={(e) =>{
            setUser({ ...user, confirmPassword: e.target.value })
            FunctionsService.labelDisplay(e)
          }}
        />
      </div>
      
      <button type="submit">Modifier</button>
      
    </form>
  );
};

export default EditUser;