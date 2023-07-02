import React, { useEffect, useState } from 'react';
import PostService from '../../../setup/services/post.service';
import PostCard from './PostCard';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [endPost, setEndPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const newPosts = await PostService.getAll(`limit=5&page=${page}`)
      if(newPosts.length === 0){
        setEndPost(true);
      }else{
        const prevPosts = posts;
        setPosts([...prevPosts, ...newPosts]);
      }

      setIsLoading(false);
    }

    getPosts();
  }, [page]);

  useEffect(() => {
    if (!endPost && !isLoading) {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
          !endPost &&
          !isLoading
        ) {
          const nextPage = page + 1;
          setPage(nextPage);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [endPost, isLoading, page]);

  return (
    <div className='main'>
      {posts.length > 0 && (
        <div className="posts">
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
            />
          ))}

          {isLoading && <p>Chargement...</p>}
          {endPost && <p>Fin des posts</p>}
        </div>
      )}
    </div>
  );
};

export default PostList;