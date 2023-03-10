import React, { useContext, useState } from 'react';
import { PostContext } from '../../../setup/contexts/PostContext';
import { ScriptsContext } from '../../../setup/contexts/ScriptsContext';
import PostService from '../../../setup/services/post.service';

const CreatePostForm = ({ setPosts }) => {
  const { credentials, handleChange, getAllPosts } = useContext(PostContext);
  const { labelDisplay } = useContext(ScriptsContext);
  const [ displayedError, setDisplayedError ] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await PostService.create(credentials);
        setPosts();
        getAllPosts();
    } catch (error) {
        setDisplayedError(error.response.data.message);
        console.log(error);
    }
}

  return (
    <form onSubmit={handleSubmit}>
      
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