import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import PostService from "../../../setup/services/post.service";
import TokenService from "../../../setup/services/token.service";
import CreatePostForm from "../../components/posts/CreatePostForm";
import AccountPosts from "../../components/account/AccountPosts";

const AccountPage = () => {
  const [ userPosts, setUserPosts ] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const disconnect = async() => {
    TokenService.removeTokenFromLocalStorage();
    setUser({});
    navigate("/auth/signin");
  }

  const setPosts = async () => {
    if(user.id){
      try {
        console.log();
        const response = await PostService.getAllByAuthor(user.id);
        setUserPosts(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    setPosts();
  }, [user.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
      <div className="account defaultPaddingX defaultPaddingY">
          <h1>Profil Utilisateur</h1>

          <p>{user.email}</p>

          <button
            onClick={disconnect}
          >
            Déconnexion
          </button>

          <CreatePostForm setPosts={setPosts} />

          <AccountPosts userPosts={userPosts} setPosts={setPosts} />
      </div>
  );
}

export default AccountPage;