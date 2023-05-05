import React, { useContext, useEffect } from 'react';
import { PostContext } from "../../../setup/contexts/PostContext";
import PostService from '../../../setup/services/post.service';

const AccountPosts = ({ setPosts, userPosts }) => {
  const { credentials, handleChange, getAllPosts } = useContext(PostContext);
  
  const removePost = (id) => async() => {
    try {
      await PostService.remove(id);
      setPosts();
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   console.log(userPosts);
  // }, [userPosts])


  const handleUpdatePost = async(e, id) => {
    if(e.target.textContent === "Annuler"){
      e.target.parentElement.childNodes[1].disabled = true;
      e.target.parentElement.children[2].textContent = "Modifier";
      e.target.parentElement.childNodes[3].style.display = "none";


    }else if(e.target.textContent === "Modifier"){
      e.target.parentElement.childNodes[1].disabled = false;
      e.target.parentElement.childNodes[3].style.display = "block";

      
      e.target.textContent = "Enregister";
      
    }else if(e.target.textContent === "Enregister"){
      e.target.parentElement.childNodes[1].disabled = true;
      e.target.textContent = "Modifier";
      
      try {
        await PostService.update(id, credentials);
        setPosts();
        getAllPosts();
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="userPosts">
      {userPosts[0] ? (
          <>
            {userPosts && userPosts.map((post, id) => (
              <div className="userPost" key={post.id}>
                <h2>Publication {id + 1}</h2>

                <input 
                  defaultValue={post.content} 
                  disabled
                  onChange={handleChange}
                  name="content"
                />

                <button
                  onClick={ (e) => { handleUpdatePost(e, post.id)} }
                  className="updatePost"
                >
                  Modifier
                </button>
                <button
                  style={{display: "none"}}
                  onClick={(e) => { handleUpdatePost(e)} }
                  className="cancelUpdatePost"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={removePost(post.id)}
                  className="removePost"
                >
                  Supprimer
                </button>

                { post.uploadFile && (
                  <img src={post.uploadFile.Location} alt=""  width="300" />
                )}
              </div>
            ))}
          </>
        ) : (
          <p>Tu n'as pas encore publié de posts</p>
        )
      }
    </div>
  );
};

export default AccountPosts;