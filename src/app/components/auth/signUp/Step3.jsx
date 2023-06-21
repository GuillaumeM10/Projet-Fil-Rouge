import React, { useState } from 'react';
import { useEffect } from 'react';

const Step3 = ({ handleChange, labelDisplay}) => {
  const [skills, setSkills] = useState({
    "target": {
      "name" : null,
      "value" : []
    }
  });
  const [currentSkill, setCurrentSkill] = useState({"level": 0});

  const handleChangeSkills = (e) => {
    let { name, value } = e.target;
    const oldSkills = currentSkill;
    setCurrentSkill({...oldSkills, [name]: value})
  }

  const addSkill = (e) => {
    const oldSkills = skills;
  
    if( // if the skill is already in the list
      !currentSkill.name
      || (
        skills.target.value.find((skill) => skill.name === currentSkill.name)
        && skills.target.value.find((skill) => skill.level === currentSkill.level)
        && skills.target.value.find((skill) => skill.description === currentSkill.description)
      )
    ) return;

    if( // if the skill is already in the list but with different level or description
      skills.target.value.find((skill) => skill.name === currentSkill.name)
      && (
        skills.target.value.find((skill) => skill.level !== currentSkill.level)
        || skills.target.value.find((skill) => skill.description !== currentSkill.description)
      )
    ){
      const skill = skills.target.value.find((skill) => skill.name === currentSkill.name);
      const index = skills.target.value.indexOf(skill);
      skills.target.value[index] = currentSkill;
      setSkills({
        ...oldSkills,
        "target": {
          "name": "skills",
          "value": [
            ...oldSkills.target.value,
          ]
        }
      });
      return;
    }

    setSkills({ // if the skill is not in the list
      ...oldSkills,
      "target": {
        "name": "skills",
        "value": [
          ...oldSkills.target.value,
          currentSkill
        ]
      }
    });
    // handleChange(skills);
  }

  const removeSkill = (e, index) => {
    e.preventDefault();
    const oldSkills = skills;

    setSkills({
      ...oldSkills,
      "target": {
        "name": "skills",
        "value": [
          ...oldSkills.target.value.slice(0, index),
          ...oldSkills.target.value.slice(index + 1)
        ]
      }
    });
  }

  useEffect(() => {
    console.log(skills);
    if(skills.target.name === "skills"){
      handleChange(skills);
    }
  }, [skills])

  // links
  // experiences
  

  return (
    <div className="step step3">
      <h2>Professionnel</h2>
      
      {/* formation */}
      <div className="formGroup">
        <label htmlFor="formation">Formation</label>
        <input
          type="text"
          name="formation"
          placeholder="Formation"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      {/* description */}
      <div className="formGroup">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      {/* range */}
      <div className="formGroup">
        <label htmlFor="range">Distance maximal de déplacement (en kilomètres)</label>
        <input
          type="number"
          name="range"
          placeholder="Range"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      {/* school */}
      <div className="formGroup">
        <label htmlFor="school">Ecole</label>
        <input
          type="text"
          name="school"
          placeholder="Ecole"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>
      
      {/* skills */}
      <div className="skills">
        <p>Compétences</p>
        <div className="formGroup name">

          {/* name */}
          <label htmlFor="skills">Compétences</label>
          <input
            type="text"
            name="name"
            placeholder="Compétences"
            required
            onChange={(e) => {
              labelDisplay(e)
              handleChangeSkills(e)
            }}
            />

        </div>

        {/* level */}
        <div className="formGroup level">
          <label htmlFor="level">Niveau</label>
          <select
            name="level"
            required
            onChange={(e) => {
              labelDisplay(e)
              handleChangeSkills(e)
            }}
          >
            <option value="0">Débutant</option>
            <option value="1">Intermédiaire</option>
            <option value="2">Avancé</option>
          </select>
        </div>

        {/* description */}
        <div className="formGroup description">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            required
            onChange={(e) => {
              labelDisplay(e)
              handleChangeSkills(e)
            }}
          />
        </div>
        <button
          type="button"
          className="addButton"
          onClick={(e) => {addSkill(e)}}
        >
          Ajouter
        </button>

        {/* skills list */}
        {skills.target.value.length > 0 && (
          <div className="cards">
          {skills.target.value.map((skill, index) => {
              return (
                <div className='skill' key={index}>
                  <p>{skill.name}</p>
                  <p>
                    {skill.level === "0" && "Débutant"}
                    {skill.level === "1" && "Intermédiaire"}
                    {skill.level === "2" && "Avancé"}
                  </p>
                  {skill.description && <p>{skill.description}</p>}
                  
                  <button 
                    type="button"
                    className='removeButton'
                    onClick={(e) => {removeSkill(e, index)}}
                  >X</button>
                </div>
              )
          })}
          </div>
        )}
        
        
      </div>
      
    </div>
  );
};

export default Step3;