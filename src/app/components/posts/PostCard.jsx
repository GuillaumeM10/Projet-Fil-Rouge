import React from 'react';

const PostCard = ({ 
  post,
  index
}) => {
  return (
    <div key={post.id} className={post.id + 'card'}>
      <h5>{index + 1}</h5>
      <h2>{post.title}</h2>
      <p
        dangerouslySetInnerHTML={{__html: post.content}}
      >
      </p>
    </div>
  );
};

export default PostCard;