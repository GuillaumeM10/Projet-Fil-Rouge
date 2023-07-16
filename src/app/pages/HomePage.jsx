import { useContext, useEffect, useState, useCallback } from "react";
import Filters from "../components/posts/Filters";
import PostList from "../components/posts/PostList";
import PostService from "../../setup/services/post.service";
import { UserContext } from "../../setup/contexts/UserContext";
import CreatePostForm from "../components/posts/CreatePostForm";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [endPost, setEndPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [modale, setModale] = useState(false);
  const [filters, setFilters] = useState('');
  const { user } = useContext(UserContext);

  const getPosts = useCallback(async (createPost = false) => {
    if (createPost) {
      try {
        setIsLoading(true);
        const newPosts = await PostService.getAll(`limit=5&page=1`)
        setPage(1);
        setPosts(newPosts);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setIsLoading(true);
        const newPosts = await PostService.getAll(`limit=5&page=${page}${filters ? filters : ''}`)

        if (newPosts.length === 0 && page === 1) {
          setPosts([]);
          setIsLoading(false);
        } else if (newPosts.length === 0) {
          setEndPost(true);
          setIsLoading(false);
        } else if (page === 1) {
          setEndPost(false);
          setPosts(newPosts);
          setIsLoading(false);
        } else {
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          setTimeout(() => {
            setIsLoading(false)
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [filters, page]);

  useEffect(() => {
    setPage(1);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !endPost) {
      getPosts();
      setIsLoading(false);
    }
  }, [filters, isLoading, page, endPost, getPosts]);

  useEffect(() => {
    if (!endPost && !isLoading) {
      const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
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

  useEffect(() => {
    if (modale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modale]);

  return (
    <div className="homePage">
      <h1 style={{ display: "none" }}>Home page</h1>

      <div className="content">

      {user?.id && (
        <>
          <button
            className="btnGreen"
            style={{
              width: "100%",
            }}
            onClick={() => setModale(true)}
          >
            Créer un post
          </button>
          {modale && (
            <div className="modale">
              <div
                className="bg"
                onClick={() => setModale(false)}
              ></div>
              <button
                className="cross btnGreen"
                onClick={() => setModale(false)}
              >
                x
              </button>
              <CreatePostForm setPosts={getPosts} />
            </div>
          )}
        </>
      )}

      <Filters
        setFilters={setFilters}
        setPage={setPage}
        isLoading={isLoading}
        endPost={endPost}
      />

      <PostList
        posts={posts}
        endPost={endPost}
        isLoading={isLoading}
      />
      </div>

      <aside>
        <h2 className="asideTitle">
          <span className="text">Nos articles</span>
          <span className="hover-bar hover-1"></span>
          <span className="hover-bar hover-2"></span>
          <span className="hover-bar hover-3"></span>
          <span className="hover-bar hover-4"></span>
        </h2>

        <div className="articles">
          <div className="article">
            <h3>Article 1</h3>
            <p>
              Rédiger un post efficace pour trouver le stage idéal. Mettez en avant vos compétences et suscitez l'intérêt des recruteurs.
            </p>
            <Link
              to="/les-etapes-essentielles-pour-rediger-un-post-efficace-et-trouver-un-stage"
              className="readMore"
            >
              Lire la suite
            </Link>
          </div>

          <div className="article">
            <h3>Article 2</h3>
            <p>
              Réussir votre entretien pro. Faites des recherches, mettez en valeur vos compétences, montrez votre motivation. Soyez pro et remerciez après l'entretien.
            </p>
            <Link
              to="/les-cles-pour-reussir-un-entretien-avec-succes"
              className="readMore"
            >
              Lire la suite
            </Link>
          </div>
        </div>


      </aside>

    </div>
  );
}

export default HomePage;