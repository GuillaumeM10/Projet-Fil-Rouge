import React, { useState } from 'react';
import { useEffect } from 'react';
import PostService from '../../../setup/services/post.service';
import PreviewFiles from '../PreviewFiles/PreviewFiles';
import FunctionsService from '../../../setup/services/functions.service';

const CreatePostForm = ({ setPosts, setUserPosts, setPage, user }) => {
  const [ displayedError, setDisplayedError ] = useState(null);
  const [credentials, setCredentials] = useState({})

  const getAllPosts = async (params) => {
    try {
      const response = await PostService.getAll(params);
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { 
    getAllPosts(); // eslint-disable-next-line
  }, [])

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
      setCredentials({
          ...credentials,
          [name]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials);
    try {
      // console.log(credentials);
        await PostService.create(credentials);
        setPosts(true);
        // getAllPosts();
    } catch (error) {
        setDisplayedError(error.response.data.message);
        console.log(error);
    }
  }

  return (
    <form className="creatPost" onSubmit={handleSubmit}>

      <div className="formGroup">
        <label htmlFor="content">Status</label>
        <textarea
          type="text"
          name="content"
          placeholder="Contenu du post"
          required
          onChange={(e) => {
            handleChange(e)
            FunctionsService.labelDisplay(e)
          }}
        />
      </div>

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
        <p className="extentions">
          Extensions autorisées : <br />
          Images : png, jpeg <br />
          Vidéos : mp4, mov, avi, mkv, wmv, flv, webm, mpeg <br />
          Audios : mpeg, ogg, wav, wma, aac, flac, mp4 <br />
          Documents : pdf
        </p>
        <p>
          Taille maximale : 10 Mo
        </p>
      </div>

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
      
      <button type="submit">Créer</button>
    </form>
  );
};

export default CreatePostForm;