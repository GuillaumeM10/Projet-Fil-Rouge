import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../setup/contexts/UserContext';
import UserService from '../../../../setup/services/user.service';
import Select, { components } from 'react-select';
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
  const handleCountryChange = (event) => {
    const selectedCountry = cca2[event.value];
    const maxRows = 1000;
    let startRows = 0;

    fetch(`http://api.geonames.org/searchJSON?country=${selectedCountry}&maxRows=${maxRows}&username=guillaumem`)
      .then(response => response.json())
      .then(data => {
        // ... Handle API response and update cities state
        let result = data.geonames.map(city => city.name); // Adjust this based on the API response structure
        const totalResults = data.totalResultsCount;

        if (totalResults > maxRows + startRows) {
          while (totalResults > startRows + maxRows) {
            if (startRows < 5000) {
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
            } else {
              return;
            }
          }
        } else {
          setCities(result);
        }
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
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
    setupCountries();
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
    }
  }, [credentials?.userDetail?.country, cca2]);

  return (
    <div className="step step2">
      <h2>Personnel</h2>

      {/* firstName */}
      <div className="formGroup">
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          defaultValue={ credentials?.firstName ? credentials?.firstName : newUser?.firstName }
          required
          onChange={(e) => {
            handleChange(e);
            FunctionsService.labelDisplay(e);
          }}
        />
      </div>

      {/* lastName */}
      <div className="formGroup">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          required
          defaultValue={ credentials?.lastName ? credentials?.lastName : newUser?.lastName }
          onChange={(e) => {
            handleChange(e);
            FunctionsService.labelDisplay(e);
          }}
        />
      </div>

      {/* contactEmail */}
      <div className="formGroup">
        <label htmlFor="contactEmail">Email de contact</label>
        <input
          type="email"
          name="contactEmail"
          placeholder="Email de contact"
          defaultValue={ credentials?.contactEmail ? credentials?.contactEmail : newUser?.contactEmail }
          onChange={(e) => {
            handleChange(e);
            FunctionsService.labelDisplay(e);
          }}
        />
      </div>

      {/* country */}
      <div className="formGroup">
        <label htmlFor="country">Pays</label>
        <Select 
          name="country"
          placeholder="Choisissez votre pays"
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
        <div className="formGroup">
          <label htmlFor="cities">Villes</label>
          <Select
            name="cities"
            placeholder="Choisissez vos villes"
            isMulti
            onChange={e => {
              handleChange({target : {name: "cities", value: e}})
            }}
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
      <div className="formGroup">
        <label htmlFor="status">Status</label>
        <Select
          name="status"
          className="status"
          placeholder="Status"
          required
          onChange={(selectedOption) => {
            handleChange({target : {name: "status", value: selectedOption.value}});
          }}
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