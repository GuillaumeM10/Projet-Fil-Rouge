import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import PostService from "../../../setup/services/post.service";
import TokenService from "../../../setup/services/token.service";
import CreatePostForm from "../../components/posts/CreatePostForm";
import AccountPosts from "../../components/account/AccountPosts";
import EditUser from "../../components/account/EditUser";
import AdminControls from "../../components/account/AdminControls";

const AccountPage = () => {
  const [ userPosts, setUserPosts ] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [ page, setPage ] = useState(1); // eslint-disable-line no-unused-vars
  const [ noMorePosts, setNoMorePosts ] = useState(false);
  const [tabs, setTabs] = useState('createPost');
  const navigate = useNavigate();
  
  const disconnect = async() => {
    TokenService.removeTokenFromLocalStorage();
    setUser({});
    navigate("/auth/signin");
  }

  const setPosts = async (create) => {
    if(user.id){
      try {
        if(create){

          const response = await PostService.getAllByAuthor(user.id, 1);
          setUserPosts(response);
          setPage(1);
          setNoMorePosts(false);

        }else if(userPosts.length === 0){

          const response = await PostService.getAllByAuthor(user.id, page);
          setUserPosts(response);

        }else if(page > 1){

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
    // console.log(user);
  }, [user.id, page]) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
      <div className="account defaultPaddingX defaultPaddingY">
          <h1>Compte</h1>

          <p>{user.email}</p>

          <button
            onClick={disconnect}
          >
            Déconnexion
          </button>

          <div className="tabs buttons">
            <button
              onClick={() => setTabs("createPost")}
              className={"createPost " + (tabs === "createPost" ? "active" : "")}
            >
              Créer un post
            </button>

            <button
              onClick={() => setTabs("editUser")}
              className={"editUser " + (tabs === "editUser" ? "active" : "")}
            >
              Editer le profil
            </button>

            <button
              onClick={() => setTabs("myPosts")}
              className={"myPosts " + (tabs === "myPosts" ? "active" : "")}
            >
              Mes posts
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => setTabs("admin")}
                className={"admin " + (tabs === "admin" ? "active" : "")}
              >
                Admin
              </button>
            )}

          </div>

          {/* createPost */}
          {tabs === "createPost" && (
            <CreatePostForm setPosts={setPosts} user={user} />
            )}

          {/* editUser */}
          {tabs === "editUser" && (
            <EditUser />
          )}

          {/* myPosts */}
          {tabs === "myPosts" && (
            <AccountPosts userPosts={userPosts} setPosts={setPosts} setPage={setPage} page={page} noMorePosts={noMorePosts} />
          )}

          {/* admin */}
          {tabs === "admin" && (
            <AdminControls />
          )}

      </div>
  );
}

export default AccountPage;