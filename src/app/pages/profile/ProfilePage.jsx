import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../../setup/services/user.service';
import toast from 'react-hot-toast';
import PostService from '../../../setup/services/post.service';
import PostCard from '../../components/posts/PostCard';
import FunctionsService from '../../../setup/services/functions.service';
import PreviewFiles from '../../components/PreviewFiles/PreviewFiles';
import Loading from '../../components/ui/Loading';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if(!user.userDetail) return;
    if(!user.userDetail || user.userDetail.displayedOnFeed === false || user.userDetail.profilComplet === false) {
      navigate('/');
    }  // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserService.getOneById(id);
        setUser(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getUser();

    const getUserPosts = async () => {
      try {
        const data = await PostService.getAllByAuthor(id, 1, 100);
        setUserPosts(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    getUserPosts();

  }, [id]);

  return (
    <div className='profilPage'>
      {(user) ? (
        <>
          {/* TOP */}
          <div className="top">
            {/* BANNER */}
            <div className="banner">
              {user.userDetail?.banner?.Location ? (
                <img src={user.userDetail?.banner?.Location} alt="profile" />
              ): (
                <img width="100" src="/img/default-banner.png" alt="profile" />
              )}
            </div>

            {/* PP */}
            <div className="pp">
              {user.userDetail?.personalPicture?.Location ? (
                <img src={user.userDetail?.personalPicture?.Location} alt="profile" />
              ): (
                <img width="100" src="/img/default_pp.webp" alt="profile" />
              )}
            </div>

          </div>

          {/* CONTENT */}
          <div className="content">
                {/* SIDE BAR */}
                <aside>
                    <h1>
                      {user.firstName} {user.lastName}
                    </h1>

                    {/* CONTACT MAIL */}
                    {user.userDetail?.contactEmail && (
                      <>
                        <h2>
                          <span className="text">Contact</span>
                          <span className="hover-bar hover-1"></span>
                          <span className="hover-bar hover-2"></span>
                          <span className="hover-bar hover-3"></span>
                          <span className="hover-bar hover-4"></span>
                        </h2>
                        <a 
                          href={`mailto:${user.userDetail?.contactEmail}`} 
                          className="contactMail"
                        >
                          <img src="/img/mail.svg" alt="mail logo" width="22" />
                          {user.userDetail?.contactEmail}
                        </a>
                      </>
                    )}

                    {/* LOCALISATION */}
                    {user.userDetail?.country && (
                      <>
                        <h2>
                          <span className="text"><img src="/img/location.svg" alt="location logo" width="22" />Localisation</span>
                          <span className="hover-bar hover-1"></span>
                          <span className="hover-bar hover-2"></span>
                          <span className="hover-bar hover-3"></span>
                          <span className="hover-bar hover-4"></span>
                        </h2>
                        <div 
                          className="localisation"
                        >
                          <span>Je suis actuellement ici : {user.userDetail?.country}{user.userDetail?.range && `, et je peux me déplacer à ${user.userDetail.range}km autour de mon domicile`}.</span>
                        </div>
                      </>
                    )}

                    {/* LINKS */}
                    {user.userDetail?.links?.length > 0 && (
                      <>
                      <h2>
                        <span className="text">{user.userDetail?.links?.length > 1 ? "Mes liens" : "Mon lien"}</span>
                        <span className="hover-bar hover-1"></span>
                        <span className="hover-bar hover-2"></span>
                        <span className="hover-bar hover-3"></span>
                        <span className="hover-bar hover-4"></span>
                      </h2>
                      <div className="links">
                        {user.userDetail.links.map((link, index) => (
                            <div className='link' key={index}>
                            <a href={link.url} className="row button" target='_blank' rel="noreferrer">
                              <div dangerouslySetInnerHTML={{__html: link.linkCategory.icon}}></div>

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
                            
                            
                          
                          </div>
                        ))}
                      </div>
                      </>
                    )}

                    {/* CITIES */}
                    {user.userDetail?.cities?.length > 0 && (
                      <>
                      <h2>
                        <span className="text">{user.userDetail?.cities?.length > 1 ? "Mes villes" : "Ma ville"}</span>
                        <span className="hover-bar hover-1"></span>
                        <span className="hover-bar hover-2"></span>
                        <span className="hover-bar hover-3"></span>
                        <span className="hover-bar hover-4"></span>
                      </h2>
                      <div className="cities">
                        {user.userDetail.cities.map((city, index) => (
                          <p className='city' key={index}>
                            {city.name}
                          </p>
                        ))}
                      </div>
                      </>
                    )}

                    {/* SKILLS */}
                    {user.userDetail?.skills?.length > 0 && (
                      <>
                      <hr />
                      <h2>
                        <span className="text">{user.userDetail?.skills?.length > 1 ? "Mes compétences" : "Ma compétence"}</span>
                        <span className="hover-bar hover-1"></span>
                        <span className="hover-bar hover-2"></span>
                        <span className="hover-bar hover-3"></span>
                        <span className="hover-bar hover-4"></span>
                      </h2>
                      <div className="skills">
                        {user.userDetail.skills.map((skill, index) => (
                          <div className='skill' key={index}>
                            <p className='name'>{skill.name}</p>
                            <p className='level'>Niveau : <span>
                              {(skill.level === "0" || skill.level === 0 ) && "Débutant"}
                              {(skill.level === "1" || skill.level === 1 ) && "Intermédiaire"}
                              {(skill.level === "2" || skill.level === 2 ) && "Avancé"}
                              </span>
                            </p>
                            {skill.description && (
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
                                <p className='description'>{skill.description}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      </>
                    )}

                    {/* EXPERIENCES */}
                    {user.userDetail?.experiences?.length > 0 && (
                      <>
                      <hr />
                      <h2>
                        <span className="text">{user.userDetail?.experiences?.length > 1 ? "Mes expériences" : "Mon expérience"}</span>
                        <span className="hover-bar hover-1"></span>
                        <span className="hover-bar hover-2"></span>
                        <span className="hover-bar hover-3"></span>
                        <span className="hover-bar hover-4"></span>
                      </h2>
                      <div className="experiences">
                        {user.userDetail.experiences.map((experience, index) => (
                          <div className='experience' key={index}>
                            <p className='companieName'>{experience.companieName}</p>
                            {(experience.startDate || experience.endDate) && (
                              <div className="dates">
                                {experience.startDate && !(experience.startDate instanceof Date && !isNaN(experience.startDate)) &&(
                                  <p className='date startDate'>Début : <span>{FunctionsService.dateFormater(experience.startDate)}</span></p>
                                )}
                                {experience.endDate && !(experience.endDate instanceof Date && !isNaN(experience.endDate)) &&(
                                  <p className='date endDate'>Fin : <span>{FunctionsService.dateFormater(experience.endDate)}</span></p>
                                )}
                              </div>
                            )}
                            <p className='jobName'>{experience.jobName}</p>
            
                            {(experience.type && (
                              <p className='type'>{experience.type}</p>
                            ))}
                            <p className={`actualyIn ${experience.actualyIn ? " green" : "" }`}></p>
            
                            <small className='actualyInSmall'>
                              {experience.actualyIn ? (
                                <>
                                  <span>*</span>
                                  <span className='color green'></span>
                                  <span>: Occupe actuellement le post.</span>
                                </>
                              ) : (
                                <>
                                  <span>*</span>
                                  <span className='color red'></span>
                                  <span>: N'occupe plus le post.</span>
                                </>
                              ) }
                            </small>
                          </div>
                        ))}
                      </div>
                      </>
                    )}

                    {/* FORMATION */}
                    {user.userDetail?.formation && (
                      <>
                        <hr />
                        <h2>
                          <span className="text">Ma formation</span>
                          <span className="hover-bar hover-1"></span>
                          <span className="hover-bar hover-2"></span>
                          <span className="hover-bar hover-3"></span>
                          <span className="hover-bar hover-4"></span>
                        </h2>
                        <div 
                          className='formation'
                        >
                          <p className='schoolName'>{user.userDetail.formation}</p>
                          {user.userDetail.school && (
                            <p className='school'>Mon école : {user.userDetail.school}</p>
                          )}
                        </div>
                      </>
                    )}

                </aside>

                <div className="right">
                  {/* CV */}
                  {user.userDetail?.cv && (
                    <>
                      <h2 className="main">Mon CV</h2>
                      <div className="cv">
                        <PreviewFiles files={[user.userDetail.cv]} location={true} />
                      </div>
                      <hr />
                    </>
                  )}
                  
                  {/* FILES */}
                  {user.userDetail?.files?.length > 0 && (
                    <>
                      <h2 className="main">Mes fichiers</h2>
                      <div className="files">
                        <PreviewFiles files={user.userDetail.files} location={true} isSwiper={true} />
                      </div>
                      <hr />
                    </>
                  )}

                  {/* POSTS */}
                  <div className="posts">
                    {userPosts.length === 0 && ("Cet utilisateur n'a encore rien posté.")}
                    {userPosts.map((post) => (
                      post.published && <PostCard key={post.id} post={post} />
                      ))}
                  </div>
                </div>
          </div>
          
          
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProfilePage;