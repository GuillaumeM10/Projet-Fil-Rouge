import React from 'react';
import PreviewFiles from '../PreviewFiles/PreviewFiles';

const PostCard = ({ 
  post,
  index
}) => {

  console.log(post);
  console.log(post?.uploadFiles?.length);

  return (
    <div key={post.id} className={post.id + ' post'}>
        <div className="author">
          <img src={post.author?.detail?.personalPicture ? post.author?.detail?.personalPicture : '/img/profil.svg'} alt={post.author.name} className='pp' />
          <div className="names">
            <h4>{post.author.firstName}</h4>
            <h4>{post.author.lastName}</h4>
          </div>
        </div>
        <h5>index : {index + 1}</h5>
        <h2>{post.title}</h2>
        <p
          dangerouslySetInnerHTML={{__html: post.content}}
        >
        </p>
        {post.uploadFiles?.length > 0 && 
          <PreviewFiles files={post.uploadFiles} location={true} />
        }
      <a href={'/posts/' + post.id}>
        Voir le post
      </a>
    </div>
  );
};

export default PostCard;