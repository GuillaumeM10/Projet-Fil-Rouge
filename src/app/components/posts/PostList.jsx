import React, { useContext } from 'react';
import { PostContext } from '../../../setup/contexts/PostContext';

const PostList = () => {
  const { posts } = useContext(PostContext)

  return (
    <div>
      {posts[0] ? (
        <>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.content}</p>
              <p>{post.published}</p>
              <p>Auteur : {post.author.firstName} {post.author.lastName}</p>
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