import React, { useEffect, useRef, useState } from 'react';
import PostService from '../../../setup/services/post.service';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [endPost, setEndPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    PostService.getAll(`limit=2&page=${page}`)
      .then(response => {

        console.log('new posts', response);

        if (response.length > 0) {
          setPosts(prevPosts => [...prevPosts, ...response]);
        } else {
          console.log('end posts');
          setEndPost(true);
        }

        setIsLoading(false);
        console.log('page', page);
      });
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
    <div>
      {posts.length > 0 && (
        <>
          {posts.map((post, index) => (
            <div key={post.id} className={post.id}>
              <h5>{index + 1}</h5>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}

          {isLoading && <p>Chargement...</p>}
          {endPost && <p>Fin des posts</p>}
        </>
      )}
    </div>
  );
};

export default PostList;