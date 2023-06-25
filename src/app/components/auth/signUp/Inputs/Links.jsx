import React, { useState } from 'react';
import FunctionsService from '../../../../../setup/services/functions.service';

const Links = ({
  setLinks,
  links,
}) => {
  const [currentLink, setCurrentLink] = useState({});

  const handleChangeLinks = (e) => {
    let { name, value } = e.target;
    const oldLinks = currentLink;
    setCurrentLink({...oldLinks, [name]: `${value}`})
  }

  const addLink = (e) => {
    const oldLinks = links;
  
    if( // if the skill is already in the list
      !currentLink.name
      || (
        links.target.value.find((link) => link.name === currentLink.name)
        && links.target.value.find((link) => link.link === currentLink.link)
        && links.target.value.find((link) => link.description === currentLink.description)
      )
    ) return;

    if( // if the skill is already in the list but with different level or description
    links.target.value.find((link) => link.name === currentLink.name)
      && (
        links.target.value.find((link) => link.link !== currentLink.link)
        || links.target.value.find((link) => link.description !== currentLink.description)
      )
    ){
      const skill = links.target.value.find((link) => link.name === currentLink.name);
      const index = links.target.value.indexOf(skill);
      links.target.value[index] = currentLink;
      setLinks({
        ...oldLinks,
        "target": {
          "name": "links",
          "value": [
            ...oldLinks.target.value,
          ]
        }
      });
      return;
    }

    setLinks({ // if the skill is not in the list
      ...oldLinks,
      "target": {
        "name": "skills",
        "value": [
          ...oldLinks.target.value,
          currentLink
        ]
      }
    });
    // handleChange(skills);
  }

  const removeLink = (e, index) => {
    e.preventDefault();
    let oldLinks = links;

    setLinks({
      ...oldLinks,
      "target": {
        "name": "links",
        "value": [
          ...oldLinks.target.value.slice(0, index),
          ...oldLinks.target.value.slice(index + 1)
        ]
      }
    });
  }


  return (
    <div className='links'>
      <h3>Liens</h3>

      {/* name */}
      <div className="formGroup">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeLinks(e)
          }}
          />
      </div>
      
      {/* link */}
      <div className="formGroup">
        <label htmlFor="link">Lien</label>
        <input
          type="text"
          name="link"
          placeholder="Lien"
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeLinks(e)
          }}
          />
      </div>

      {/* description */}
      <div className="formGroup">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeLinks(e)
          }}
          />
      </div>

      <button
        type="button"
        className="addButton"
        onClick={(e) => {addLink(e)}}
      >
        Ajouter
      </button>

      {/* link list */}
      {links.target.value.length > 0 && (
        <div className="cards">
        {links.target.value.map((link, index) => {
            return (
              <div className='experience' key={index}>
                <a href={link.link} target='_blank'>{link.name}</a>
                <p>{link.description}</p>
                
                <button 
                  type="button"
                  className='removeButton'
                  onClick={(e) => {removeLink(e, index)}}
                >X</button>
              </div>
            )
        })}
        </div>
      )}
      
    </div>
  );
};

export default Links;