import React, { useEffect, useState } from 'react';
import CityService from '../../../setup/services/city.service';
import SkillService from '../../../setup/services/skill.service';
import Select from 'react-select';
import FunctionsService from '../../../setup/services/functions.service';

const Filters = ({
  setFilters,
  setPage
}) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [btnState, setBtnState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let filters = '';
    setBtnState(false);
    
    if (selectedCities.length > 0) {
      filters += `&cities=${selectedCities}`;
    }
    if (selectedSkills.length > 0) {
      filters += `&skills=${selectedSkills}`;
    }
    setPage(1);
    setFilters(filters);
  }




  useEffect(() => {
    const getCities = async () => {
      const cities = await CityService.getAll();
      setCities(cities);
    }
    getCities();

    const getSkills = async () => {
      const skills = await SkillService.getAll();
      setSkills(skills);
    }
    getSkills();
  }, []);

  const handleChange = (name, selectedOptions) => {
    setBtnState(true);
  
    if (name === "cities") {
      setSelectedCities(selectedOptions.map(option => option.value));
    }
    if (name === "skills") {
      setSelectedSkills(selectedOptions.map(option => option.value));
    }
  };

  return (
    <form 
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="filters"
    >
      {/* cities */}
      {cities.length > 0 && (
        <div className="formGroup reactSelect cities">
          <label 
            htmlFor="cities"
            className={"active"}
          >
            Villes
          </label>
          <Select
            name="cities"
            placeholder="Choisissez vos villes"
            isMulti
            onChange={selectedOptions => {
              handleChange("cities", selectedOptions);
            }}
            styles={FunctionsService.reactSelectCustomStyles()}
            options={cities
              .map((city, index) => {
                return { value: city.name, label: city.name };
              })
            }
          />
        </div>
      )}

      {/* skills */}
      {skills.length > 0 && (
        <div className="formGroup reactSelect skills">
          <label
            htmlFor="skills"
            className={"active"}
          >
            Compétences
          </label>
          <Select
            name="skills"
            placeholder="Choisissez vos compétences"
            isMulti
            onChange={selectedOptions => {
              handleChange("skills", selectedOptions);
            }}
            styles={FunctionsService.reactSelectCustomStyles()}
            options={skills
              .map((skill, index) => {
                return { value: skill.name, label: skill.name };
              })
            }
          />
        </div>
      )}

      <button 
        type="submit" 
        className="btnPrimary"
        {...btnState ? {disabled: false} : {disabled: true}}
      >Rechercher</button>
      
    </form>
  );
};

export default Filters;