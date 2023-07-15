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
      || !currentLink.url
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
                <a href={link.link} className="row button" target='_blank' rel="noreferrer">
                  <div div dangerouslySetInnerHTML={{__html: link.linkCategory.icon}}></div>
                  {link.name}
                </a>
                
                {link.description && (
                  <div className="moreInfo">
                    <button
                      type="button"
                      className="moreInfoButton"
                      onClick={(e) => {
                        e.preventDefault();
                        const moreInfo = e.currentTarget.parentElement.parentElement.querySelector(`.description`);
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
                    <p className='description'>{link.description}</p>
                  </div>
                )}
                
                
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