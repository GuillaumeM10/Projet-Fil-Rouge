import { useEffect, useState } from "react";
import Filters from "../components/posts/Filters";
import PostList from "../components/posts/PostList";
import PostService from "../../setup/services/post.service";

const HomePage = () => {
  const [endPost, setEndPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState('');

  const getPosts = async () => {
    setIsLoading(true);
    const newPosts = await PostService.getAll(`limit=5&page=${page}${filters ? filters : ''}`)
    if(newPosts.length === 0){
      setEndPost(true);

      if(page === 1){
        setPosts(newPosts);
      }
    }else{
      setEndPost(false);
      if(page === 1){
        setPosts(newPosts);
      }else{
        const prevPosts = posts;
        setPosts([...prevPosts, ...newPosts]);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getPosts(); // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true); // Set loading flag to true before API call
      getPosts();
      setIsLoading(false); // Set loading flag back to false after API call
    } // eslint-disable-next-line
  }, [filters, page, isLoading]); // Add loading as a dependency

  useEffect(() => {
    if (!endPost && !isLoading) {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
          !endPost &&
          !isLoading
        ) {
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

  return ( 
      <div className="homePage defaultPaddingX defaultPaddingY">
          <h1 style={{display: "none"}}>Home page</h1>

          <Filters
            setFilters={setFilters}
            setPage={setPage}
          />

          <PostList 
            posts={posts}
            endPost={endPost}
            isLoading={isLoading}
          />
      </div>
  );
}

export default HomePage;