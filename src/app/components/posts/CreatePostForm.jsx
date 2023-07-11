import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import PostService from '../../../setup/services/post.service';
import PreviewFiles from '../PreviewFiles/PreviewFiles';
import FunctionsService from '../../../setup/services/functions.service';
import axios from 'axios';
import Select, { components } from 'react-select';
import { Toaster, toast } from 'react-hot-toast';
import SkillService from '../../../setup/services/skill.service';
import ReCAPTCHA from "react-google-recaptcha";

const CreatePostForm = ({ setPosts }) => {
  const [ displayedError, setDisplayedError ] = useState(null);
  const [credentials, setCredentials] = useState({})
  const [countries, setCountries] = useState([]);
  const [cca2, setCca2] = useState({});
  const [cities, setCities] = useState({})
  const [toggleFilesTypes, setToggleFilesTypes] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [skills, setSkills] = useState([]);
  const recaptchaRef = useRef(null);

  // Custom Option component to handle hiding options based on search value
  const Option = (props) => {
    return props.data.isOptionHidden ? null : <components.Option {...props} />;
  };

  // Handler for search value change
  const handleSearchChange = (event) => {
    setSearchValue(event);
  };

  // Handler for country change  
  const handleCountryChange = async (event) => {
    const selectedCountry = cca2[event.value];
    const maxRows = 1000;
    let startRows = 0;
  
    try {
      const response = await axios.get(`https://secure.geonames.org/searchJSON?country=${selectedCountry}&maxRows=${maxRows}&username=guillaumem`);
      const data = response.data;
      let result = data.geonames.map(city => city.name);
      const totalResults = data.totalResultsCount;
  
      if (totalResults > maxRows + startRows) {
        while (totalResults > startRows + maxRows) {
          if (startRows < 5000) {
            startRows += maxRows;
  
            const newResponse = await axios.get(`https://secure.geonames.org/searchJSON?country=${selectedCountry}&maxRows=${maxRows}&startRow=${startRows}&username=guillaumem`);
            const newData = newResponse.data;
  
            result = [...result, ...newData.geonames.map(city => city.name)];
            setCities(result);
          } else {
            return;
          }
        }
      } else {
        setCities(result);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
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
    SkillService.getAll().then(response => {
      const skillsArray = response.map(skill => ({ 'name': skill.name, 'id': skill.id}))
      setSkills(skillsArray)
    })   
    handleChange({ target: { name: 'cities', value: [] } });
    setupCountries(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
      let { name, value } = e.target;
      if(name === "content") {
          value = e.target.value;
          value = value.replace(/\n/g, "<br />");
      };
      if (name === "published") value = e.target.checked;
      if(name === "files"){
          value = e.target.files;
      };
      if(name === "cities"){
        const citiesArray = []
        e.target.value.forEach(city => citiesArray.push({ 'name': city.value }))
        value = citiesArray;
      };
      if(name === "skills"){
        const skillsArray = []
        e.target.value.forEach(skill => skillsArray.push({ 'name': skill.value }))
        value = skillsArray;
      };

      setCredentials({
          ...credentials,
          [name]: value
      })
  }

  // useEffect(() => {
  //   console.log(credentials);
  // }, [credentials])

  // useEffect(() => {
  //   console.log({skills});
  // }, [skills])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(credentials.files && FunctionsService.filesSizeCheck(credentials.files, setDisplayedError) === false) return
    
    try {
      // console.log(credentials);
      const token = await recaptchaRef.current.executeAsync();
      await PostService.create({...credentials, token});
      toast.success('Votre post a bien été créé');
      setPosts(true);
    } catch (error) {
      setDisplayedError(error.response.data.message);
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <form className="creatPost" onSubmit={handleSubmit}>

      {/* content */}
      <div className="formGroup">
        <label htmlFor="content">Contenu</label>
        <textarea
          type="text"
          name="content"
          placeholder="Contenu du post"
          required
          maxLength={500}
          onChange={(e) => {
            handleChange(e)
            FunctionsService.labelDisplay(e)
          }}
        />
        <small>
          {credentials.content?.length || 0}/500
        </small>
      </div>

      {/* skills */}
      <div className="formGroup">
        <label htmlFor="skills">Compétences</label>
        <Select
          name="skills"
          placeholder="Choisissez vos compétences"
          isMulti
          onChange={e => {
            handleChange({target : {name: "skills", value: e}})
          }}
          onInputChange={handleSearchChange}
          styles={FunctionsService.reactSelectCustomStyles()}
          options={
            skills.map((skill, index) => {
              if(searchValue && !skills.some((skill) => skill.name === searchValue)) return { value: searchValue, label: searchValue }
              return { value: skill.name, label: skill.name }
            })
          }
        />
      </div>

      {/* country */}
      <div className="formGroup">
        <label 
          htmlFor="country"
          className={credentials?.userDetail?.country ? "active" : ""}
        >
          Pays
        </label>
        <Select 
          name="country"
          placeholder="Choisissez votre pays"
          styles={FunctionsService.reactSelectCustomStyles()}
          options={countries.map((country, index) => ({
            value: country,
            label: country,
          }))}
          onChange={e => {
            handleCountryChange(e)
          }}
        />
      </div>

      {/* cities */}
      {cities.length > 0 && (
        <div className="formGroup">
          <label 
            htmlFor="cities"
            className={credentials?.userDetail?.cities ? "active" : ""}
          >
            Villes
          </label>
          <Select
            name="cities"
            placeholder="Choisissez vos villes"
            isMulti
            onChange={e => {
              handleChange({target : {name: "cities", value: e}})
            }}
            styles={FunctionsService.reactSelectCustomStyles()}
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

      {/* files */}
      <div className="formGroup file">
        
        <input
          type="file"
          name="files"
          multiple
          placeholder="Image"
          limit="5"
          size={10000000}
          accept="image/png, image/jpeg, video/mp4, video/mov, video/avi, video/mkv, video/wmv, video/flv, video/webm, video/mpeg, audio/mpeg, audio/ogg, audio/wav, audio/wma, audio/aac, audio/flac, audio/mp4, application/pdf"
          onChange={(e) => {
            handleChange(e)
          }}
        />
        <label
          onClick={(e) => {
            e.target.parentElement.querySelector('input').click()
          }} 
          htmlFor="files" 
        >
          Fichiers
        </label>

        {credentials.files && credentials.files.length > 0 && (
          <PreviewFiles files={credentials.files} isSwiper={true} />
        )}
        <div className="authorizedFiles">
          <button
            type="button"
            className='btn btnPrimarySmall'
            onClick={() => setToggleFilesTypes(!toggleFilesTypes)}
          >
            Extensions autorisées
          </button>

          {toggleFilesTypes && (
            <p className="extentions">
              Images : png, jpeg <br />
              Vidéos : mp4, mov, avi, mkv, wmv, flv, webm, mpeg <br />
              Audios : mpeg, ogg, wav, wma, aac, flac, mp4 <br />
              Documents : pdf
            </p>
          )}
        </div>
        <p>
          Taille maximale : 10 Mo
        </p>
      </div>

      {/* displayOnFeed */}
      <div style={{ 
          display: 'flex', 
          flexDirection: 'column'
        }}>
        <label htmlFor="published">Etre affiché dans le feed (oui par défaut)</label>
        <input
          type="checkbox"
          name="published"
          placeholder="Je souhaite être visible sur le feed"
          defaultChecked={true}
          onChange={(e) => {
            handleChange(e)
          }}
        />
      </div>

      { displayedError && <div className="error">{ displayedError }</div> }
      
      <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
          hidden={true}
      />

      <button type="submit">Créer</button>

      <Toaster />
    </form>
  );
};

export default CreatePostForm;