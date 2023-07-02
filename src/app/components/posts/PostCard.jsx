import React from 'react';
import PreviewFiles from '../PreviewFiles/PreviewFiles';

const PostCard = ({ 
  post,
  index,
  isSinglePage = false
}) => {
  return (
    <>
      {post ? (
        <div key={post.id} className={post.id + ' post'}>
          {post.skills || post.cities ? (
            <div className="tags">
              {post.skills?.map((skill, index) => (
                <span key={index} className="tag">{skill.name}</span>
              ))}
              {post.cities?.map((city, index) => (
                <span key={index} className="tag">{city.name}</span>
              ))}
            </div>
          ): null}
          <div className="author">
            {post.author.userDetail.displayedOnFeed && post.author.userDetail.profilComplet ? (
              <a href={`/profile/${post.author.id}`}>
                <img src={post.author?.userDetail?.personalPicture?.Location ? post.author.userDetail.personalPicture.Location : '/img/profil.svg'} alt={post.author?.firstName} className='pp' />
                <div className="names">
                  <h4>{post.author.firstName}</h4>
                  <h4>{post.author.lastName}</h4>
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
          <h5>index : {index + 1}</h5>
          <h5>id : {post.id}</h5>
          <h2>{post.title}</h2>
          <p
            dangerouslySetInnerHTML={{__html: post.content}}
          >
          </p>
          {post.uploadFiles?.length > 0 && 
            <PreviewFiles files={post.uploadFiles} location={true} />
          }

          {!isSinglePage && (
            <a className='seeMore' href={'/posts/' + post.id}>
              Voir le post
            </a>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PostCard;