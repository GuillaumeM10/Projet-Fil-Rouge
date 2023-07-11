import React, { useState } from 'react';
import { useEffect } from 'react';
import Skills from './Inputs/Skills';
import DefaultInput from './Inputs/DefaultInput';
import Experiences from './Inputs/Experiences';
import Links from './Inputs/Links';

const Step3 = ({ handleChange, credentials }) => {
  const [tabs, setTabs] = useState('skills');

  const [skills, setSkills] = useState({
    "target": {
      "name" : null,
      "value" : []
    }
  });
  const [ experiences, setExperiences ] = useState({
    "target": {
      "name" : null,
      "value" : []
    }
  });
  const [ links, setLinks ] = useState({
    "target": {
      "name" : null,
      "value" : []
    }
  });
  
  useEffect(() => {
    if(skills.target.name === "skills"){
      handleChange(skills);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills])

  useEffect(() => {
    if(experiences.target.name === "experiences"){
      handleChange(experiences);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences])

  useEffect(() => {
    if(links.target.name === "links"){
      handleChange(links);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links])
  
  useEffect(() => {
    if(credentials?.userDetail?.skills){
      let skillsArray = [];
      // eslint-disable-next-line
      credentials.userDetail.skills.map((skill) => { // eslint-disable-next-line
        skillsArray.push({
          "name": skill.name,
          "level": skill.level,
          "description": skill.description
        }) 
      })
      
      setSkills({
        "target": {
          "name": "skills",
          "value": skillsArray
        }
      })
    }

    if(credentials?.userDetail?.experiences){
      let experiencesArray = [];

      // eslint-disable-next-line
      credentials.userDetail.experiences.map((experience) => {

        experiencesArray.push({
          "companieName": experience.companieName,
          "jobName": experience.jobName,
          "startDate": experience.startDate,
          "endDate": experience.endDate,
          "actualyIn": experience.actualyIn,
          "type": experience.type,
        })

      })
      
      setExperiences({
        "target": {
          "name": "experiences",
          "value": experiencesArray
      }})
    }

    if(credentials?.userDetail?.links){
      let linksArray = [];

      // eslint-disable-next-line
      credentials.userDetail.links.map((link) => {
          
          linksArray.push({
            "name": link.name,
            "link": link.url,
            "description": link.description,
            "linkCategory": link.linkCategory,
          })
  
        }
      )

      setLinks({
        "target": {
          "name": "links",
          "value": linksArray
      }})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
  return (
    <div className="step step3">
      <h2>
        <span className="text">Professionnel</span>
        <span className="hover-bar hover-1"></span>
        <span className="hover-bar hover-2"></span>
        <span className="hover-bar hover-3"></span>
        <span className="hover-bar hover-4"></span>
      </h2>
      
      {/* formation */}
      <DefaultInput 
        name="formation"
        handleChange={handleChange}
        credentials={credentials?.userDetail?.formation}
      />

      {/* description */}
      <DefaultInput 
        name="description"
        handleChange={handleChange}
        credentials={credentials?.userDetail?.description}
        textarea={true}
      />

      {/* range */}
      <DefaultInput 
        name="range"
        handleChange={handleChange}
        credentials={credentials?.userDetail?.range}
        placeholder={"Distance maximal de déplacement (en kilomètres)"}
        type={"number"}
      />

      {/* school */}
      <DefaultInput 
        name="school"
        handleChange={handleChange}
        credentials={credentials?.userDetail?.school}
        placeholder={"Ecole"}
      />

      <div className="tabs buttons">
        <button
          type='button'
          onClick={() => setTabs("skills")}
          className={"skills " + (tabs === "skills" ? "active" : "")}
        >
          Skills
        </button>

        <button
          type='button'
          onClick={() => setTabs("experiences")}
          className={"experiences " + (tabs === "experiences" ? "active" : "")}
        >
          Experiences
        </button>
        
        <button
          type='button'
          onClick={() => setTabs("links")}
          className={"links " + (tabs === "links" ? "active" : "")}
        >
          Links
        </button>
      </div>

      {/* skills */}
      {tabs === "skills" && (
        <Skills 
          setSkills={setSkills}
          skills={skills}
        />
      )}

      {/* experiences */}
      {tabs === "experiences" && (
        <Experiences
          setExperiences={setExperiences}
          experiences={experiences}
        />
      )}

      {/* links */}
      {tabs === "links" && (
        <Links
          setLinks={setLinks}
          links={links}
        />
      )}
      
    </div>
  );
};

export default Step3;