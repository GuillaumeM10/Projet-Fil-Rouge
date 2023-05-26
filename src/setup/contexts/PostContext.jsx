import { createContext, useContext, useEffect, useState } from "react";
import PostService from "../services/post.service";

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])

    const [credentials, setCredentials] = useState({})

    const getAllPosts = async (params) => {
      try {
        const response = await PostService.getAll(params);
        setPosts(response);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getAllPosts();
    }, [])

    const handleChange = (e) => {
      console.log('change');

      let { name, value } = e.target;
      if (name === "published") value = e.target.checked;
      if(name == "files"){
          value = e.target.files;
      };

      setCredentials({
          ...credentials,
          [name]: value
      })
    }

    return (
        <PostContext.Provider value={{
            credentials,
            handleChange,
            posts,
            getAllPosts
        }}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider };