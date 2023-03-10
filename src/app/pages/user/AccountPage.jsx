import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../../setup/contexts/PostContext";
import { UserContext } from "../../../setup/contexts/UserContext";
import PostService from "../../../setup/services/post.service";
import TokenService from "../../../setup/services/token.service";
import CreatePostForm from "../../components/posts/CreatePostForm";

const AccountPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [ userPosts, setUserPosts ] = useState([]);
  const { credentials, handleChange } = useContext(PostContext);

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
  }, [user.id])

  const disconnect = async() => {
    TokenService.removeTokenFromLocalStorage();
    setUser({});
    navigate("/auth/signin");
  }

  const removePost = (id) => async() => {
    try {
      await PostService.remove(id);
      setPosts();
    } catch (error) {
      console.log(error);
    }
  }

  const updatePost = async(e, id) => {
    // console.log("e");
    if(e.target.textContent === "Modifier"){
      e.target.parentElement.childNodes[1].disabled = false;
      e.target.parentElement.childNodes[2].style.display = "block";
      
      e.target.textContent = "Enregister";
      
    }else if(e.target.textContent === "Enregister"){
      console.log("enregister");
      e.target.parentElement.childNodes[1].disabled = true;
      e.target.textContent = "Modifier";
      
      try {
        await PostService.update(id, credentials);
        setPosts();
      } catch (error) {
        console.log(error);
      }
    }
  }


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

          <div className="userPosts">
            {userPosts[0] ? (
                <>
                  {userPosts && userPosts.map((post, id) => (
                    <div className="userPost" key={post.id}>
                      <h2>Publication {id + 1}</h2>

                      <input 
                        defaultValue={post.content} 
                        disabled
                        onChange={handleChange}
                        name="content"
                      />

                      <button
                        onClick={ (e) => {updatePost(e, post.id)} }
                      >
                        Modifier
                      </button>
                      <button
                        style={{display: "none"}}
                        onClick={(e) => {
                          e.target.parentElement.children[1].textContent = "Modifier";
                          e.target.parentElement.children[0].disabled = true;
                          e.target.style.display = "none";
                        }}
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={removePost(post.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <p>Tu n'as pas encore publié de posts</p>
              )
            }
          </div>
      </div>
  );
}

export default AccountPage;