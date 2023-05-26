import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { ScriptsContext } from '../../../setup/contexts/ScriptsContext';
import PostService from '../../../setup/services/post.service';

const CreatePostForm = ({ setPosts }) => {
  const { labelDisplay } = useContext(ScriptsContext);
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
    getAllPosts();
  }, [])

  const handleChange = (e) => {
    console.log('change');
      let { name, value } = e.target;
      if (name === "published") value = e.target.checked;
      if(name == "files"){
          value = e.target.files;
      };
      setCredentials({
          ...credentials,
          [name]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      console.log(credentials);
        await PostService.create(credentials);
        setPosts();
        getAllPosts();
    } catch (error) {
        setDisplayedError(error.response.data.message);
        console.log(error);
    }
  }

  // useEffect( () => {
  //   console.log(credentials);
  // }, [credentials])

  const logFiles = (e) => {
    // console.log(e.target.files);
  }

  const filesPreview = (e) => {
    const previewFiles = document.querySelector('.previewFiles');
    previewFiles.innerHTML = '';
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.addEventListener('load', function() {
        const div = document.createElement('div');
        div.classList.add('previewFile');
        div.innerHTML = `
          <img src="${this.result}" width="100" />
          <p>${file.name}</p>
        `;
        previewFiles.appendChild(div);
      });
      reader.readAsDataURL(file);
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
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="files">Image</label>
        <input
          type="file"
          name="files"
          multiple
          placeholder="Image"
          onChange={(e) => {
            handleChange(e)
            logFiles(e)
            filesPreview(e)
          }}
        />
        {/* system make a preview a the files */}
        <div className="previewFiles"></div>

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