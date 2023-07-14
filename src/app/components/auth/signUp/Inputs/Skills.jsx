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
      || !currentSkill.level
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
      <div className="formGroup name">

        {/* name */}
        <label htmlFor="skills">Compétences</label>
        <input
          type="text"
          name="name"
          placeholder="Compétences"
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
          placeholder="Niveau"
          onChange={(e) => {
            handleChangeSkills({ target : { name: "level", value: e.value }})
          }}
          styles={FunctionsService.reactSelectCustomStyles()}
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
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeSkills(e)
          }}
        />
        <small className='maxLength'>
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
                <p className='name'>{skill.name}</p>
                <p className='level'>Niveau : <span>
                  {(skill.level === "0" || skill.level === 0 ) && "Débutant"}
                  {(skill.level === "1" || skill.level === 1 ) && "Intermédiaire"}
                  {(skill.level === "2" || skill.level === 2 ) && "Avancé"}
                  </span>
                </p>
                {skill.description && (
                  <div className="moreInfo">
                    <button
                      type="button"
                      className="moreInfoButton"
                      onClick={(e) => {
                        e.preventDefault();
                        const moreInfo = e.target.parentElement.parentElement.querySelector(`.description`);
                        if(moreInfo.classList.contains('active')){
                          moreInfo.classList.remove('active');
                        }else{
                          moreInfo.classList.add('active');
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 31.357 31.357" >
                        <g>
                          <path d="M15.255,0c5.424,0,10.764,2.498,10.764,8.473c0,5.51-6.314,7.629-7.67,9.62c-1.018,1.481-0.678,3.562-3.475,3.562   c-1.822,0-2.712-1.482-2.712-2.838c0-5.046,7.414-6.188,7.414-10.343c0-2.287-1.522-3.643-4.066-3.643   c-5.424,0-3.306,5.592-7.414,5.592c-1.483,0-2.756-0.89-2.756-2.584C5.339,3.683,10.084,0,15.255,0z M15.044,24.406   c1.904,0,3.475,1.566,3.475,3.476c0,1.91-1.568,3.476-3.475,3.476c-1.907,0-3.476-1.564-3.476-3.476   C11.568,25.973,13.137,24.406,15.044,24.406z"/>
                        </g>
                      </svg>
                    </button>
                    <p className='description'>{skill.description}</p>
                  </div>
                )}
                
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