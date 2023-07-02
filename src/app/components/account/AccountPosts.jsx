import React, { useState } from 'react';
import PostService from '../../../setup/services/post.service';
import PreviewFiles from '../PreviewFiles/PreviewFiles';

const AccountPosts = ({ setPosts, userPosts, setPage, page, noMorePosts }) => {
  const [credentials, setCredentials] = useState({})
  const [isUpdating, setIsUpdating] = useState(false);
  const [menu, setMenu] = useState({
    'state': false,
    'id': null
  });

  const handleChange = (e) => {
    let { name, value, classList } = e.target;
    if (name === "published") value = e.target.checked;
    if(classList[0] === "content"){
        value = e.target.innerHTML;
        value = value.replace(/<div>/g, '');
        value = value.replace(/<\/div>/g, '<br>');
        name = "content";
    }
    if(name === "files"){
        value = e.target.files;
    };
    setCredentials({
        ...credentials,
        [name]: value
    })
  }
  
  const handleUpdatePost = async(e, id) => {
    setIsUpdating(true);
  }

  const handleSavePost = async(e, id) => {
    try {
      await PostService.update(id, credentials);
      setPosts(true);
      // getAllPosts();
    } catch (error) {
      console.log(error);
    }

    setIsUpdating(false);
  }

  const  handleDeletePost = async(e, id) => {
    e.preventDefault();
    try{ 
      await PostService.remove(id);
      document.getElementById(id).remove();
    }catch(error){
      console.log(error);
    }
  }

  const handleCancelUpdate = () => {
    setIsUpdating(false);
  }

  // useEffect(() => {
  //   console.log('menu', menu.id);
  // }, [menu]);

  return (
    <div className="userPosts">
      {userPosts[0] ? (
          <>
            <div className="posts">
              {userPosts && userPosts.map((post, id) => (
                <div className="userPost" key={post.id} id={post.id}>

                  <div 
                    className={"content" + ((isUpdating && (menu.id === post.id )) ? ' updating' : '')}
                    contentEditable={isUpdating ? true : false}
                    dangerouslySetInnerHTML={{__html: post.content}}
                    onInput={handleChange}
                    name="content"
                  >
                  </div>

                  {/* { post.uploadFiles && post.uploadFiles.map((file, key) => (
                    <img key={key} width="500" src={file.Location} alt="post" />
                  ))} */}

                  {/* { post.uploadFiles.length > 0 && console.log(post.uploadFiles) } */}

                  { post.uploadFiles.length > 0 && 
                    <PreviewFiles files={post.uploadFiles} location={true} />
                  }
                  

                  {isUpdating && menu.id === post.id && (
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

                  <div className="menuPosition">
                    
                    <div className={"menuContainer" + (menu.state && menu.id === post.id ? ' open' : '')}>

                      <button 
                        className="menu"
                        onClick={e =>{
                          const oldMenu = menu;
                          if(oldMenu.id !== post.id){
                            setIsUpdating(false);
                          }
                          setMenu(
                            {
                              'state': !oldMenu.state,
                              'id': post.id
                            }
                          );
                        }}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                      <div className="btns">

                        {!isUpdating && menu.state && menu.id === post.id && (
                          <>
                            <a href={'/posts/' + post.id}>Voir le post</a>
                            <button
                              onClick={ (e) => { 
                                handleUpdatePost(e, post.id)
                                setMenu({
                                  'state': false,
                                  'id': post.id
                                })
                              } }
                              className="updatePost"
                              >
                              Modifier
                            </button>
                          </>
                        )}

                        {isUpdating && menu.state && menu.id === post.id && (
                            <button
                              type="button"
                              onClick={(e) => { handleDeletePost(e, post.id) }}
                              className="removePost"
                              >
                              Supprimer
                            </button>
                        )}


                      </div>
                    </div>

                  </div>
                </div>
              ))}

            </div>
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