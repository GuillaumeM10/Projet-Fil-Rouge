import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../setup/contexts/UserContext';
import UserService from '../../../../setup/services/user.service';

const Step2 = ({ handleChange, labelDisplay, setCredentials}) => {
  const { user } = useContext(UserContext);
  const [ newUser, setNewUser] = useState({});
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    // GET COUNTRIES FROM PUPLIC API
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countries = data.map(country => country.translations.fra.common)
        countries.sort()
        countries.unshift('France')
        setCountries(countries)
      })

      
  }, [])

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserService.getOneById(user.id);
        setNewUser(data);
      } catch (error) {
        console.log({ type: "error", message: error.response.data.message });
      }
    };
    getUser();
  }, [user])

  // "phone",
  // "cities",
  // "range"
  return (
    <div className="step step2">
      <h2>Personnel</h2>

      <div className="formGroup">
        <label htmlFor="firstName">Prénom</label>
        <input 
          type="text"
          name="firstName"
          placeholder="Prénom"
          defaultValue={newUser?.firstName}
          required
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
          required
          defaultValue={newUser?.lastName}
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="contactEmail">Email de contact</label>
        <input
          type="email"
          name="contactEmail"
          placeholder="Email de contact"
          defaultValue={newUser?.contactEmail}
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="country">Pays</label>
        <select
          name="country"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        >
          <option value="">Choisir un pays</option>
          {countries.map((country, index) => {
            return <option key={index} value={country}>{country}</option>
          })}
        </select>
      </div>

      <div className="formGroup">
        <label htmlFor="cities">Villes</label>
        <select
          name="cities"
          required
          onChange={(e) => {
            handleChangeCountries(e)
            labelDisplay(e)
          }}
        >
          <option value="">Choisir</option>
        </select>
      </div>

      <div className="formGroup">
        <label htmlFor="status">Status</label>
        <select 
          name="status" 
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        >
          <option value="">Choisir une option</option>
          <option value="Etudiant">Etudiant</option>
          <option value="Alternant">Alternant</option>
          <option value="Freelance">Freelance</option>
          <option value="Demandeur emploi">Demandeur d'emploi</option>
          <option value="Salarié">Salarié</option>
          <option value="Autre">Autre</option>
        </select>
        
      </div>
      
    </div>
  );
};

export default Step2;