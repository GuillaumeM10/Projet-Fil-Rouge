import React from 'react';
import { Link } from "react-router-dom";
import PreviewFiles from '../PreviewFiles/PreviewFiles';
import { toast } from 'react-hot-toast';

const PostCard = ({ 
  post,
  isSinglePage = false
}) => {
  return (
    <>
      {post.author && post.published && post ? (
        <div key={post.id} className={post.id + ' post'}>

          {/* TAGS */}
          {post.skills || post.cities ? (
            <div className="tags">
              {post.skills?.map((skill, index) => (
                <span key={index} className="tag skill">{skill.name}</span>
              ))}
              {post.cities?.map((city, index) => (
                <span key={index} className="tag city">{city.name}</span>
              ))}
            </div>
          ): null}

          {/* AUTHOR */}
          <div className="author">
            {post.author.userDetail?.displayedOnFeed && post.author.userDetail?.profilComplet ? (
              <Link to={`/profile/${post.author.id}`}>
                <img src={post.author?.userDetail?.personalPicture?.Location ? post.author.userDetail.personalPicture.Location : '/img/profil.svg'} alt={post.author?.firstName} className='pp' />
                <div className="names">
                  <h4 className='name'>{post.author.firstName} {post.author.lastName}</h4>
                  <h4 className='date'>
                      {new Date(post.createdAt).toLocaleDateString()}
                  </h4>
                </div>
              </Link>
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
          {post.title && post.title.length > 0 && <h2>{post.title}</h2>}

          {/* CONTENT */}
          <p
            dangerouslySetInnerHTML={{__html: post.content}}
            className='content'
          >
          </p>

          {/* FILES */}
          {post.uploadFiles?.length > 0 && 
            <PreviewFiles files={post.uploadFiles} location={true} isSwiper={true} />
          }

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

            {!isSinglePage && (
              <Link
                className='seeMore' 
                to={'/posts/' + post.id}
              >
                Voir le post

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z" style={{fill:"#fff"}} data-name="Right"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      ) : post.published && (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PostCard;