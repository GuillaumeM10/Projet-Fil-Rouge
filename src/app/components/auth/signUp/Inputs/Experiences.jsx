import React, { useEffect, useState } from 'react';
import FunctionsService from '../../../../../setup/services/functions.service';
import Select from 'react-select';

const Experiences = ({
  setExperiences,
  experiences,
}) => {
  const [currentExperience, setCurrentExperience] = useState({
    "actualyIn": false,
    "type": "stage",
    "startDate": new Date(),
    "endDate": new Date(),
  });

  const handleChangeExperiences = (e) => {
    let { name, value } = e.target;
    const oldExperiences = currentExperience;

    if(name === "actualyIn") value = e.target.checked === true ? true : false;
    if(name === 'startDate' || name === 'endDate') value = new Date(value);
    setCurrentExperience({ ...oldExperiences, [name]: value });
  }

  const removeExperience = (e, index) => { 
    e.preventDefault();
    let oldExperiences = experiences;
    
    setExperiences({
      ...oldExperiences,
      "target": {
        "name": "experiences",
        "value": [
          ...oldExperiences.target.value.slice(0, index),
          ...oldExperiences.target.value.slice(index + 1)
        ]
      }
    });
  }

  const addExperience = (e) => {
    const oldExperiences = experiences;

    if( // if the experience is already in the list
      (
        !currentExperience.companieName
        && !currentExperience.jobName
      )
      || (
        experiences.target.value.find((experience) => experience.companieName === currentExperience.companieName)
        && experiences.target.value.find((experience) => experience.jobName === currentExperience.jobName)
        && experiences.target.value.find((experience) => experience.startDate === currentExperience.startDate)
        && experiences.target.value.find((experience) => experience.endDate === currentExperience.endDate)
        && experiences.target.value.find((experience) => experience.actualyIn === currentExperience.actualyIn)
        && experiences.target.value.find((experience) => experience.type === currentExperience.type)
      )
    ) return;

    if( // if the experience is already in the list but with different startDate or endDate or actualyIn or type
      (
        experiences.target.value.find((experience) => experience.companieName === currentExperience.companieName)
        && experiences.target.value.find((experience) => experience.jobName === currentExperience.jobName)
      )
      && (
        experiences.target.value.find((experience) => experience.startDate !== currentExperience.startDate)
        || experiences.target.value.find((experience) => experience.endDate !== currentExperience.endDate)
        || experiences.target.value.find((experience) => experience.actualyIn !== currentExperience.actualyIn)
        || experiences.target.value.find((experience) => experience.type !== currentExperience.type)
      )
    ){
      const experience = experiences.target.value.find((experience) => experience.companieName === currentExperience.companieName);
      const index = experiences.target.value.indexOf(experience);
      experiences.target.value[index] = currentExperience;
      setExperiences({
        ...oldExperiences,
        "target": {
          "name": "experiences",
          "value": [
            ...oldExperiences.target.value,
          ]
        }
      });
      return;
    }

    setExperiences({
      ...oldExperiences,
      "target": {
        "name": "experiences",
        "value": [
          ...oldExperiences.target.value,
          currentExperience
        ]
      }
    });
  }


  return (
    <div className="experiences">
      <p>Expériences</p>
      
      {/* companieName */}
      <div className="formGroup companieName">

        <label htmlFor="companieName">Nom de l'entreprise</label>
        <input
          type="text"
          name="companieName"
          placeholder="Nom de l'entreprise"
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* jobName */}
      <div className="formGroup jobName">

        <label htmlFor="jobName">Nom du poste</label>
        <input
          type="text"
          name="jobName"
          placeholder="Nom du poste"
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* startDate */}
      <div className="formGroup startDate">

        <label htmlFor="startDate">Date de début</label>
        <input
          type="date"
          name="startDate"
          placeholder="Date de début"
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* endDate */}
      <div className="formGroup endDate">
        
        <label htmlFor="endDate">Date de fin</label>
        <input
          type="date"
          name="endDate"
          placeholder="Date de fin"
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* type */}
      <div className="formGroup type">
        <label htmlFor="type">Type du poste</label>
        <Select 
          name="type"
          required
          placeholder="Type du poste"
          onChange={(e) => {
            handleChangeExperiences({ target : { name: "type", value: e.value }})
          }}
          options={[
            { value: "Stage", label: "Stage" },
            { value: "Alternance", label: "Alternance" },
            { value: "CDD", label: "CDD" },
            { value: "CDI", label: "CDI" },
            { value: "Freelance", label: "Freelance" },
            { value: "Bénévolat", label: "Bénévolat" },
            { value: "Autre", label: "Autre" }
          ]}
        />
      </div>

      {/* actualyIn */}
      <div className="formGroup actualyIn">

        <label htmlFor="actualyIn">Actuellement en poste</label>
        <input
          type="checkbox"
          name="actualyIn"
          placeholder="Actuellement en poste"
          onChange={(e) => {
            handleChangeExperiences(e)
          }}
          />

      </div>

      <button
        type="button"
        className="addButton"
        onClick={(e) => {addExperience(e)}}
      >
        Ajouter
      </button>

      {/* experiences list */}
      {experiences.target.value.length > 0 && (
        <div className="cards">
        {experiences.target.value.map((experience, index) => {
            return (
              <div className='experience' key={index}>
                <p>{experience.companieName}</p>
                <p>{experience.jobName}</p>
                <p>{FunctionsService.dateFormater(experience.startDate)}</p>
                <p>{FunctionsService.dateFormater(experience.endDate)}</p>
                <p>{experience.type}</p>
                <p>{experience.actualyIn ? experience.actualyIn : "false"}</p>
                
                <button 
                  type="button"
                  className='removeButton'
                  onClick={(e) => {removeExperience(e, index)}}
                >X</button>
              </div>
            )
        })}
        </div>
      )}
        
    </div>
  );
};

export default Experiences;