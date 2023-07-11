import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../setup/contexts/UserContext';
import UserService from '../../../../setup/services/user.service';
import Select, { components } from 'react-select';
// import FunctionsService from '../../../../setup/services/functions.service';
import DefaultInput from './Inputs/DefaultInput';
import axios from 'axios';
import FunctionsService from '../../../../setup/services/functions.service';

const Step2 = ({ handleChange, credentials }) => {
  // Access user data from the UserContext
  const { user } = useContext(UserContext);

  // State variables
  const [newUser, setNewUser] = useState({});
  const [countries, setCountries] = useState([]);
  const [cca2, setCca2] = useState({});
  const [cities, setCities] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // Custom Option component to handle hiding options based on search value
  const Option = (props) => {
    return props.data.isOptionHidden ? null : <components.Option {...props} />;
  };

  // Handler for search value change
  const handleSearchChange = (event) => {
    setSearchValue(event);
  };

  // Handler for country change  
  const handleCountryChange = async (event) => {
    const selectedCountry = cca2[event.value];
    const maxRows = 1000;
    let startRows = 0;
  
    try {
      const response = await axios.get(`https://secure.geonames.org/searchJSON?country=${selectedCountry}&maxRows=${maxRows}&username=guillaumem`);
      const data = response.data;
      let result = data.geonames.map(city => city.name);
      const totalResults = data.totalResultsCount;
  
      if (totalResults > maxRows + startRows) {
        while (totalResults > startRows + maxRows) {
          if (startRows < 5000) {
            startRows += maxRows;
  
            const newResponse = await axios.get(`https://secure.geonames.org/searchJSON?country=${selectedCountry}&maxRows=${maxRows}&startRow=${startRows}&username=guillaumem`);
            const newData = newResponse.data;
  
            result = [...result, ...newData.geonames.map(city => city.name)];
            setCities(result);
          } else {
            return;
          }
        }
      } else {
        setCities(result);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Fetch and setup countries on component mount
  const setupCountries = async () => {
    try {
      // Fetch countries
      const response = await fetch('https://restcountries.com/v3.1/all');
      const fetchFullCountries = await response.json();

      // Sort countries
      const countriesOnly = fetchFullCountries.map(country => country.translations.fra.common);
      countriesOnly.sort();
      countriesOnly.unshift('France');
      setCountries(countriesOnly);

      // Set cca2
      const cca2Data = fetchFullCountries.reduce((acc, country) => {
        acc[country.translations.fra.common] = country.cca2;
        return acc;
      }, {});
      setCca2(cca2Data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    handleChange({ target: { name: 'cities', value: [] } });
    setupCountries(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Fetch user data on component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserService.getOneById(user.id);
        setNewUser(data);
      } catch (error) {
        console.log({ type: 'error', message: error.response.data.message });
      }
    };
    getUser(); 
  }, [user]);

  useEffect(() => {
    if (credentials?.userDetail?.country) {
      handleCountryChange({ value: credentials?.userDetail?.country });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials?.userDetail?.country, cca2]);

  return (
    <div className="step step2">
      <h2>
        <span className="text">Personnel</span>
        <span className="hover-bar hover-1"></span>
        <span className="hover-bar hover-2"></span>
        <span className="hover-bar hover-3"></span>
        <span className="hover-bar hover-4"></span>
      </h2>

      {/* firstName */}
      <DefaultInput
        name="firstName"
        placeholder="Prénom"
        credentials={ credentials?.firstName ? credentials?.firstName : newUser?.firstName }
        handleChange={handleChange}
      />

      {/* lastName */}
      <DefaultInput
        name="lastName"
        placeholder="Nom"
        credentials={ credentials?.lastName ? credentials?.lastName : newUser?.lastName }
        handleChange={handleChange}
      />


      {/* contactEmail */}
      <DefaultInput
        name="contactEmail"
        placeholder="Email de contact"
        credentials={ credentials?.userDetail?.contactEmail ? credentials?.userDetail?.contactEmail : "" }
        handleChange={handleChange}
      />

      {/* country */}
      <div className="formGroup reactSelect country">
        <label 
          htmlFor="country"
          className={credentials?.userDetail?.country ? "active" : ""}
        >
          Pays
        </label>
        <Select 
          name="country"
          placeholder="Choisissez votre pays"
          styles={FunctionsService.reactSelectCustomStyles()}
          options={countries.map((country, index) => ({
            value: country,
            label: country,
          }))}
          defaultValue={
            credentials?.userDetail?.country
              ? {
                  value: credentials.userDetail.country,
                  label: credentials.userDetail.country,
                }
              : null
          }
          onChange={e => {
            handleCountryChange(e)
            handleChange({target : {name: "country", value: e.value}})
          }}
        />
      </div>

      {/* cities */}
      {cities.length > 0 && (
        <div className="formGroup reactSelect cities">
          <label 
            htmlFor="cities"
            className={credentials?.userDetail?.cities ? "active" : ""}
          >
            Villes
          </label>
          <Select
            name="cities"
            placeholder="Choisissez vos villes"
            isMulti
            onChange={e => {
              handleChange({target : {name: "cities", value: e}})
            }}
            styles={FunctionsService.reactSelectCustomStyles()}
            options={cities
              .filter((city, index) =>
                city.toLowerCase().includes(searchValue.toLowerCase())
              )
              .slice(0, 10)
              .map((city, index) => {
                const isOptionHidden =
                  searchValue !== "" &&
                  !city.toLowerCase().includes(searchValue.toLowerCase()) &&
                  index > 10;
          
                return { value: city, label: city, isOptionHidden };
              })
            }
            components={{ Option }} // Use the custom Option component
            onInputChange={handleSearchChange}
          />
        </div>
      )}

      {/* status */}
      <div className="formGroup reactSelect alternant">
        <label 
          htmlFor="status"
          className={credentials?.userDetail?.status ? "active" : ""}
        >
          Status
        </label>
        <Select
          name="status"
          className="status"
          placeholder="Status"
          defaultValue={
            credentials?.userDetail?.status
              ? {
                  value: credentials.userDetail.status,
                  label: credentials.userDetail.status,
                }
              : null
          }
          required
          onChange={(selectedOption) => {
            handleChange({target : {name: "status", value: selectedOption.value}});
          }}
          styles={FunctionsService.reactSelectCustomStyles()}
          options={[
            { value: 'Etudiant', label: 'Etudiant' },
            { value: 'Alternant', label: 'Alternant' },
            { value: 'Freelance', label: 'Freelance' },
            { value: 'Demandeur emploi', label: "Demandeur d'emploi" },
            { value: 'Salarié', label: 'Salarié' },
            { value: 'Autre', label: 'Autre' }
          ]}
        />
        
      </div>
    </div>
  );
};

export default Step2;