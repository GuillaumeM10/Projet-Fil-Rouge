import React, { useState } from 'react';
import PostService from '../../../setup/services/post.service';
import PreviewFiles from '../PreviewFiles/PreviewFiles';
import { toast } from 'react-hot-toast';

const AccountPosts = ({ setPosts, userPosts, setPage, page, noMorePosts }) => {
  const [credentials, setCredentials] = useState({})
  const [postUpdate, setPostUpdate] = useState({})
  const [isUpdating, setIsUpdating] = useState(false);
  const [menu, setMenu] = useState({
    'state': false,
    'id': null
  });

  const handleChange = (e) => {
    let { name, value, classList, textContent } = e.target;
    if (name === "published") value = e.target.checked;
    if(classList[0] === "tag"){
      if(classList[1] === "skill"){
        name = "skills";
        value = postUpdate.skills;

        value = value.filter(skill => skill.name !== textContent);
        value = value.map((skill) => {
          return {"name": skill.name}
        });
      }
      if(classList[1] === "city"){
        name = "cities";
        value = postUpdate.cities;
        
        value = value.filter((city) => city.name !== textContent);
        value = value.map((city) => {
          return {"name": city.name}
        });
      }
    }
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
      toast.error('Une erreur est survenue lors de la mise à jour de votre post');
      console.log(error);
    }

    setIsUpdating(false);
  }

  const handleDeletePost = async(e, id) => {
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

  return (
    <div className="userPosts">
      {userPosts[0] ? (
          <>
            <div className="posts">
              {userPosts && userPosts.map((post, id) => (
                <div className="post userPost" key={post.id} id={post.id}>

                  {/* TAGS */}
                  {post.skills || post.cities ? (
                    <div className="tags">
                      {post.skills?.map((skill, index) => (
                        <button 
                        key={index} 
                        className={`tag skill ${((isUpdating && (menu.id === post.id )) ? ' updating' : '')}`}
                        type='button'
                        onClick={(e) => { 
                          handleChange(e)
                          e.preventDefault()
                          e.target.style.display = 'none'
                        }}
                        >
                          {skill.name}
                        </button>
                      ))}
                      {post.cities?.map((city, index) => (
                        <button 
                        key={index} 
                        className={`tag city ${((isUpdating && (menu.id === post.id )) ? 'updating' : '')}`}
                        type='button'
                        onClick={(e) => { 
                          handleChange(e)
                          e.preventDefault()
                          e.target.style.display = 'none'
                        }}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  ): null}

                  {/* AUTHOR */}
                  <div className="author">
                    {post.author.userDetail?.displayedOnFeed && post.author.userDetail?.profilComplet ? (
                      <a href={`/profile/${post.author.id}`}>
                        <img src={post.author?.userDetail?.personalPicture?.Location ? post.author.userDetail.personalPicture.Location : '/img/profil.svg'} alt={post.author?.firstName} className='pp' />
                        <div className="names">
                          <h4 className='name'>{post.author.firstName} {post.author.lastName}</h4>
                          <h4 className='date'>
                              {new Date(post.createdAt).toLocaleDateString()}
                          </h4>
                        </div>
                      </a>
                    ): (
                      <>
                        <img src={post.author?.userDetail?.personalPicture?.Location ? post.author.userDetail.personalPicture.Location : '/img/profil.svg'} alt={post.author?.firstName} className='pp' />
                        <div className="names">
                          <h4>{post.author.firstName}</h4>
                          <h4>{post.author.lastName}</h4>
                        </div>
                      </>
                    )}
                  </div>

                  {/* TITLE */}
                  <h2>{post.title}</h2>

                  {/* CONTENT */}
                  <div 
                    className={"content" + ((isUpdating && (menu.id === post.id )) ? ' updating' : '')}
                    contentEditable={isUpdating ? true : false}
                    dangerouslySetInnerHTML={{__html: post.content}}
                    onInput={handleChange}
                    name="content"
                  >
                  </div>

                  {/* displayOnFeed */}
                  {isUpdating && menu.id === post.id &&(
                    <label 
                      htmlFor="published" 
                      className="checkboxContainer fHidden"
                      style={{
                        marginBottom: '20px'
                      }}
                    >
                      <span>
                        Afficher le post dans le feed (oui par défaut)
                      </span>
            
                      <span className="animation">
                        <input
                          type="checkbox"
                          name="published"
                          id='published'
                          placeholder="Je souhaite être visible sur le feed"
                          defaultChecked={post.published}
                          onChange={(e) => {
                            handleChange(e)
                          }}
                        />
                        <span className="handle"></span>
                      </span>
                  </label>
                  )}

                  {/* FILES */}
                  { post.uploadFiles.length > 0 && 
                    <PreviewFiles files={post.uploadFiles} location={true} />
                  }
                  
                  {/* UPDATE BUTTONS */}
                  {isUpdating && menu.id === post.id && (
                    <div className='editBtns'>
                      <button
                        onClick={(e) => { 
                          handleCancelUpdate(e)
                          setPostUpdate({})
                        }}
                        className="cancelUpdatePost"
                        type='button'
                      >
                        Annuler
                      </button>

                      <button
                      className='updatePost'
                        onClick={(e) => { handleSavePost(e, post.id)} }
                      >
                        Valider
                      </button>
                    </div>
                  )}

                  {/* MENU */}
                  <div className="menuPosition">
                    
                    <div className={"menuContainer" + (menu.state && menu.id === post.id ? ' open' : '')}>

                      <button 
                        className="menu"
                        type='button'
                        onClick={e =>{
                          const oldMenu = menu;
                          if(oldMenu.id !== post.id){
                            setIsUpdating(false);
                          }
                          setPostUpdate(post)
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
                              type='button'
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

                  {/* BOTTOM */}
                  <div className="bottom">
                    <button
                      className='share'

                      onClick={() => {
                        const url = window.location.host + '/posts/' + post.id;
                        navigator.clipboard.writeText(url);
                        toast('Lien copié !')
                      }}
                    >
                      Partager

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="15">
                        <path d="M21.707 2.293a1 1 0 0 0-1.069-.225l-18 7a1 1 0 0 0 .145 1.909l8.379 1.861 1.862 8.379a1 1 0 0 0 .9.78L14 22a1 1 0 0 0 .932-.638l7-18a1 1 0 0 0-.225-1.069zm-7.445 15.275L13.1 12.319l2.112-2.112a1 1 0 0 0-1.414-1.414L11.681 10.9 6.432 9.738l12.812-4.982z" style={{fill:"#fff"}} data-name="Share"/>
                      </svg>
                    </button>

                      <a 
                        className='seeMore' 
                        href={'/posts/' + post.id}
                      >
                        Voir le post

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                          <path d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z" style={{fill:"#fff"}} data-name="Right"/>
                        </svg>
                      </a>
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