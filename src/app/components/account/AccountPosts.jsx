import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from "../../../setup/contexts/PostContext";
import PostService from '../../../setup/services/post.service';

const AccountPosts = ({ setPosts, userPosts, setPage, page, noMorePosts }) => {
  const { credentials, handleChange, getAllPosts } = useContext(PostContext);

  const [isUpdating, setIsUpdating] = useState(false);
  
  const removePost = (id) => async() => {
    try {
      await PostService.remove(id);
      setPosts();
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdatePost = async(e, id) => {
    setIsUpdating(true);
  }

  const handleSavePost = async(e, id) => {
    try {
      await PostService.update(id, credentials);
      setPosts();
      getAllPosts();
    } catch (error) {
      console.log(error);
    }

    setIsUpdating(false);
  }

  const handleCancelUpdate = () => {
    setIsUpdating(false);
  }

  useEffect(() => {
    console.log(userPosts);
  }, [userPosts])

  return (
    <div className="userPosts">
      {userPosts[0] ? (
          <>
            {userPosts && userPosts.map((post, id) => (
              <div className="userPost" key={post.id}>
                <input 
                  defaultValue={post.content} 

                  disabled={!isUpdating}

                  onChange={handleChange}
                  name="content"
                />

                { post.uploadFiles && post.uploadFiles.map((file, key) => (
                  <img key={key} width="500" src={file.Location} alt="post" />
                ))}

                <div className="btns">

                {!isUpdating && (
                  <button
                    onClick={ (e) => { handleUpdatePost(e, post.id)} }
                    className="updatePost"
                  >
                    Modifier
                  </button>
                )}

                  {isUpdating && (
                    <>
                      <button
                        onClick={(e) => { handleCancelUpdate(e)} }
                        className="cancelUpdatePost"
                      >
                        Annuler
                      </button>

                      <button
                        onClick={(e) => { handleSavePost(e, post.id)} }
                      >
                        Valider
                      </button>

                    </>
                  )}

                  <button
                    type="button"
                    onClick={removePost(post.id)}
                    className="removePost"
                    >
                    Supprimer
                  </button>

                </div>

                { post.uploadFile && (
                  <img src={post.uploadFile.Location} alt="post" width="300" />
                )}
              </div>
            ))}

            {noMorePosts && (
              <p>Il n'y a plus de posts à afficher</p>
            )}
            {!noMorePosts && (
              <button
                onClick={() => {
                  const oldPage = page
                  setPage(oldPage + 1)
                }}
                className="loadMore"
                >
                Voir plus
              </button>
            )}
          </>
        ) : (
          <p>Tu n'as pas encore publié de posts</p>
        )
      }
    </div>
  );
};

export default AccountPosts;