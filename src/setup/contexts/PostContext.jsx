import { createContext, useContext, useEffect, useState } from "react";
import PostService from "../services/post.service";
import { UserContext } from "./UserContext";

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([])

    const [credentials, setCredentials] = useState({})

    const getAllPosts = async () => {
      try {
        const response = await PostService.getAll();
        setPosts(response);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getAllPosts();
    }, [])

    useEffect(() => {
      setCredentials({
        ...credentials,
        "author": user.id
      })
    }, [user])

    const handleChange = (e) => {
        let { name, value } = e.target;

        // if(["status", "formation", "country", "displayedOnFeed"].includes(name)){
            // if (name === "displayedOnFeed") value = e.target.checked;
        //     setCredentials({
        //         ...credentials,
        //         "userDetail":{
        //             ...credentials.userDetail,
        //             [name]: value
        //         }
        //     })
        // }else{
            if (name === "published") value = e.target.checked;
            setCredentials({
                ...credentials,
                [name]: value
            })
        // }
    }

    return (
        <PostContext.Provider value={{
            credentials,
            handleChange,
            posts
        }}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider };