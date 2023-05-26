import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import PostService from "../../../setup/services/post.service";
import TokenService from "../../../setup/services/token.service";
import CreatePostForm from "../../components/posts/CreatePostForm";
import AccountPosts from "../../components/account/AccountPosts";
import EditUser from "../../components/account/EditUser";

const AccountPage = () => {
  const [ userPosts, setUserPosts ] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [ page, setPage ] = useState(1); // eslint-disable-line no-unused-vars
  const [ noMorePosts, setNoMorePosts ] = useState(false);
  const navigate = useNavigate();
  
  const disconnect = async() => {
    TokenService.removeTokenFromLocalStorage();
    setUser({});
    navigate("/auth/signin");
  }

  const setPosts = async () => {
    if(user.id){
      try {
        console.log(user.id);
        if(userPosts.length === 0){
          const response = await PostService.getAllByAuthor(user.id, page);
          setUserPosts(response);
        }else{
          const response = await PostService.getAllByAuthor(user.id, page);
          if(response.length === 0) {
            setNoMorePosts(true);
            return
          }
          setUserPosts([...userPosts, ...response]);
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    setPosts();
  }, [user.id, page]) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
      <div className="account defaultPaddingX defaultPaddingY">
          <h1>Profil Utilisateur</h1>

          <p>{user.email}</p>

          <button
            onClick={disconnect}
          >
            Déconnexion
          </button>

          {/* <EditUser /> */}

          <CreatePostForm setPosts={setPosts} />

          <AccountPosts userPosts={userPosts} setPosts={setPosts} setPage={setPage} page={page} noMorePosts={noMorePosts} />
      </div>
  );
}

export default AccountPage;