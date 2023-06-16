import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PostService from '../../../setup/services/post.service';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      try {

        const data = await PostService.getOneById(id);
        console.log(data);
        setPost(data);
        
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  return (
    <div>
      {
        post ? (
          <>
            <h1>{post.content}</h1>
            <div className="author">
              <p>Auteur :</p>
              <p className="name">Nom : {post.author?.firstName}</p>
              <p className="name">Prénom : {post.author?.lastName}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  );
};

export default SinglePost;