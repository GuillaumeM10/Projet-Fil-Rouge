import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../setup/contexts/UserContext';
import UserService from '../../../../setup/services/user.service';
import Select from 'react-select';

const Step2 = ({ handleChange, labelDisplay}) => {
  const { user } = useContext(UserContext);
  const [ newUser, setNewUser] = useState({});
  const [countries, setCountries] = useState([])
  const [fullCountries, setFullCountries] = useState([])
  const [cca2, setCca2] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // GET COUNTRIES FROM PUPLIC API
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setFullCountries(data)
        const countries = data.map(country => country.translations.fra.common)
        countries.sort()
        countries.unshift('France')
        setCountries(countries)

        setCca2(data.reduce((acc, country) => {
          acc[country.translations.fra.common] = country.cca2
          return acc
        }, {}));

      })

      // GET CITIES FROM PUBLIC API
      // fetch('https://geo.api.gouv.fr/communes?fields=nom&boost=population')
      // .then(response => response.json())
      // .then(data => {
      //   const cities = data.map(city => city.nom)
      //   cities.sort()
      //   setCities(cities)
      // })

  }, [])

  const handleCountryChange = (event) => {
    setCities([])
    const selectedCountry = cca2[event.target.value];
    const maxRows = 1000;
    let startRows = 0;

    fetch(`http://api.geonames.org/searchJSON?country=${selectedCountry}&maxRows=${maxRows}&username=guillaumem`)
      .then(response => response.json())
      .then(data => {
        let result = data.geonames.map(city => city.name); // Adjust this based on the API response structure
        const totalResults = data.totalResultsCount;

        if (totalResults > maxRows + startRows) {

          while (totalResults > startRows + maxRows) {
            if(startRows < 5000){ 

              startRows += maxRows;
              fetch(`http://api.geonames.org/searchJSON?country=${selectedCountry}&maxRows=${maxRows}&startRow=${startRows}&username=guillaumem`)
                .then(response => response.json())
                .then(newData => {
                  result = [...result, ...newData.geonames.map(city => city.name)];
                  setCities(result);
                })
                .catch(error => {
                  console.error('Error fetching cities:', error);
                });

            }else{
              return;
            }

          }

        }else{
          setCities(result);
        }

      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  };

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
            handleCountryChange(e)
          }}
        >
          <option value="">Choisir un pays</option>
          {countries.map((country, index) => {
            return <option key={index} value={country}cca2={fullCountries[index]?.cca2} >{country} </option>
          })}
        </select>
      </div>

      {cities.length > 0 && (
        <div className="formGroup">
          <label htmlFor="cities">Villes</label>
          <Select
            name="cities"
            placeholder="Choisissez vos villes"
            isMulti
            onChange={(e) => {
              handleChange({target : {name: "cities", value: e}})
              // labelDisplay(e)
            }}
            options={cities.map((city, index) => {
              return { value: city, label: city }
            })}
          />

        </div>
      )}

      <div className="formGroup">
        <label htmlFor="status">Status</label>
        <select 
          name="status"
          className='status'
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