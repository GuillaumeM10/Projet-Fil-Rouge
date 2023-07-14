import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import PostService from "../../../setup/services/post.service";
import TokenService from "../../../setup/services/token.service";
import CreatePostForm from "../../components/posts/CreatePostForm";
import AccountPosts from "../../components/account/AccountPosts";
import EditUser from "../../components/account/EditUser";
import AdminControls from "../../components/account/AdminControls";
import UserService from "../../../setup/services/user.service";

const AccountPage = () => {
  const [ userPosts, setUserPosts ] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [ page, setPage ] = useState(1); // eslint-disable-line no-unused-vars
  const [ noMorePosts, setNoMorePosts ] = useState(false);
  const [tabs, setTabs] = useState('createPost');
  const [ connectedUsers, setConnectedUsers ] = useState([])
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
    const getUser = async() => {
      if(user.id === undefined) return;
      const getuser = await UserService.getOneById(user.id)
      setConnectedUsers(getuser)
    }
    getUser()
  }, [user.id, page]) // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   console.log(connectedUsers);
  // }, [connectedUsers]) // eslint-disable-line react-hooks/exhaustive-deps


  return ( 
      <div className="accountPage defaultPaddingX defaultPaddingY">
          

          <aside className="tabs buttons sidebar">
            <button
              type='button'
              onClick={() => setTabs("createPost")}
              className={"createPost " + (tabs === "createPost" ? "active" : "")}
            >
              Créer un post
            </button>

            <button
              type='button'
              onClick={() => setTabs("myPosts")}
              className={"myPosts " + (tabs === "myPosts" ? "active" : "")}
            >
              Mes posts
            </button>

            <button
              type='button'
              onClick={() => setTabs("editUser")}
              className={"editUser " + (tabs === "editUser" ? "active" : "")}
            >
              Editer le profil
            </button>

            {user.role === "admin" && (
              <button
                type='button'
                onClick={() => setTabs("admin")}
                className={"admin " + (tabs === "admin" ? "active" : "")}
              >
                Admin
              </button>
            )}

          </aside>

          <div className="content">
            <h1>Mon compte</h1>

            <div className="row">

              <p>
                Bienvenue <strong>{connectedUsers?.firstName} {connectedUsers?.lastName} </strong> !
              </p>

              <button
                className="btnPrimary"
                onClick={disconnect}
                >
                Déconnexion
              </button>

            </div>
            
            {/* createPost */}
            {tabs === "createPost" && (
              <CreatePostForm setPosts={setPosts} user={user} />
            )}

            {/* myPosts */}
            {tabs === "myPosts" && (
              <AccountPosts userPosts={userPosts} setPosts={setPosts} setPage={setPage} page={page} noMorePosts={noMorePosts} />
            )}

            {/* editUser */}
            {tabs === "editUser" && (
              <EditUser />
            )}

            {/* admin */}
            {tabs === "admin" && (
              <AdminControls />
            )}
          </div>

      </div>
  );
}

export default AccountPage;