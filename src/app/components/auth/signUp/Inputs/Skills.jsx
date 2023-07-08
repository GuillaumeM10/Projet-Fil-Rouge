import React, { useState } from 'react';
import Select from 'react-select';
import FunctionsService from '../../../../../setup/services/functions.service';

const Skills = ({
  setSkills,
  skills,
}) => {
  const [currentSkill, setCurrentSkill] = useState({"level": 0});

  const handleChangeSkills = (e) => {
    let { name, value } = e.target;
    const oldSkills = currentSkill;
    setCurrentSkill({...oldSkills, [name]: `${value}`})
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

  return (
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
            FunctionsService.labelDisplay(e)
            handleChangeSkills(e)
          }}
          />

      </div>

      {/* level */}
      <div className="formGroup level">
        <label htmlFor="level">Niveau</label>
        <Select 
          name="level"
          required
          placeholder="Niveau"
          onChange={(e) => {
            handleChangeSkills({ target : { name: "level", value: e.value }})
          }}
          options={[
            { value: 0, label: "Débutant" },
            { value: 1, label: "Intermédiaire" },
            { value: 2, label: "Avancé" }
          ]}
        />
      </div>

      {/* description */}
      <div className="formGroup description">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          maxLength={200}
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeSkills(e)
          }}
        />
        <small>
          {currentSkill.description && currentSkill.description.length}/200
        </small>
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
  );
};

export default Skills;