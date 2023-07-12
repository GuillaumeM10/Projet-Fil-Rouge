import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PostService from '../../../setup/services/post.service';
import PostCard from '../../components/posts/PostCard';
import Loading from '../../components/ui/Loading';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      try {

        const data = await PostService.getOneById(id);
        setPost(data);
        
      } catch (error) {
        console.log(error);
      }
    };
    getPost(); // eslint-disable-next-line
  }, []);

  return (
    <div className='singlePost'>
      {
        post.content ? (
          <PostCard post={post} index={post.id} isSinglePage={true} />
        ) : (
          <Loading />
        )
      }
    </div>
  );
};

export default SinglePost;