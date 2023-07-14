import React, { useEffect, useState } from 'react';
import FunctionsService from '../../../../../setup/services/functions.service';
import Select from 'react-select';
import LinkCategoriesService from '../../../../../setup/services/linkCategory.service';
import DefaultInput from './DefaultInput';

const Links = ({
  setLinks,
  links,
}) => {
  const [currentLink, setCurrentLink] = useState({});
  const [linkCategories, setLinkCategories] = useState([]);
  const [linkCategoriesOptions, setLinkCategoriesOptions] = useState([]);


  const handleChangeLinks = (e) => {
    let { name, value } = e.target;
    if (name === "linkCategory") value = parseInt(value);
    const oldLinks = currentLink;
    setCurrentLink({...oldLinks, [name]: value})
  }

  const addLink = (e) => {
    const oldLinks = links;
  
    if(
      !currentLink.name
      || !currentLink.linkCategory
      || (
        links.target.value.find((link) => link.name === currentLink.name)
        && links.target.value.find((link) => link.url === currentLink.url)
        && links.target.value.find((link) => link.description === currentLink.description)
        && links.target.value.find((link) => link.linkCategory === currentLink.linkCategory)
      )
    ) return;

    if(
    links.target.value.find((link) => link.name === currentLink.name)
      && (
        links.target.value.find((link) => link.url !== currentLink.url)
        || links.target.value.find((link) => link.description !== currentLink.description)
        || links.target.value.find((link) => link.linkCategory !== currentLink.linkCategory)
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

    setLinks({
      ...oldLinks,
      "target": {
        "name": "links",
        "value": [
          ...oldLinks.target.value,
          currentLink
        ]
      }
    });
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

  useEffect(() => {
    LinkCategoriesService.getAll().then((res) => {
      setLinkCategories(res);
    
    }).catch((err) => {
    
      console.log(err);
    
    })
      
  }, [])

  useEffect(() => {
    const options = linkCategories.map((linkCategory) => {
      return {
        value: linkCategory.id,
        label: linkCategory.name,
      }
    })
    setLinkCategoriesOptions(options);
  }, [linkCategories])

  return (
    <div className='links'>
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
        <label htmlFor="url">Lien</label>
        <input
          type="text"
          name="url"
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
          <DefaultInput 
            name="description"
            handleChange={handleChangeLinks}
            credentials={currentLink?.description}
            required={false}
            textarea={true}
          />
      </div>

      {/* linkCategory */}
      <div className="formGroup">
        <label htmlFor="linkCategory">Catégorie</label>
        <Select
          name="linkCategory"
          placeholder="Catégorie"
          styles={FunctionsService.reactSelectCustomStyles()}
          options={linkCategoriesOptions}
          onChange={(e) => {
            handleChangeLinks({ target : { name: "linkCategory", value: e.value }})
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
              <div className='link' key={index}>
                <a href={link.url} className="row button" target='_blank' rel="noreferrer">
                  {link.linkCategory && linkCategories.length > 2 && (() => {
                    let cat = linkCategories.find((linkCategory) => (linkCategory.id === +link.linkCategory));
                    return (
                      <div dangerouslySetInnerHTML={{__html: cat.icon}}></div>
                    );
                  })()}
                  {link.name}
                </a>
                
                <p className='description'>{link.description}</p>
                
                
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