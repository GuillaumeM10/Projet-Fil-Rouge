import React from 'react';
import PostCard from './PostCard';
import { Player } from '@lottiefiles/react-lottie-player';
import Loading from '../ui/Loading';

const PostList = ({ 
  posts,
  endPost,
  isLoading,
}) => {

  return (
    <div className='main'>

      {isLoading && (
        <div 
          className="loading"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '62vh'
          }}
        >
          <Loading />
        </div>
      )}
      {posts.length > 0 ? (
          <div className={`posts ${isLoading ? 'hidden' : ''}`}>
            {posts.map((post, index) => (
              <PostCard
              key={post.id}
              post={post}
              index={index}
              />
              ))}

            {endPost && 
              <Player
                autoplay
                loop
                src="/not_found.json"
                style={{ height: '300px', width: '300px' }}
              />
            }
          </div>
      ): !isLoading && (
        <>
          <Player
            autoplay
            loop
            src="/not_found.json"
            style={{ height: '300px', width: '300px' }}
          />
        </>
      )}
    </div>
  );
};

export default PostList;