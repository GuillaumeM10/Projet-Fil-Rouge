import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../../setup/contexts/PostContext';

const PostList = () => {
  const { posts } = useContext(PostContext)
  console.log(posts);

  return (
    <div>
      {posts[0] ? (
        <>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.content}</p>
              <p>{post.published}</p>
              <p>Auteur : {post.author.firstName} {post.author.lastName}</p>

              { post.uploadFiles && post.uploadFiles.map((file, key) => (
                <img key={key} width="500" src={file.Location}  />
              ))}
            </div>
          ))}
        </>
      ): 
        <p>Il n'y a pas de posts</p>
      }
    </div>
  );
};

export default PostList;