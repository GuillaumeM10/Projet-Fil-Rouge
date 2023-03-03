import PostList from "../components/posts/PostList";

const HomePage = () => {
  return ( 
      <div className="defaultPaddingX defaultPaddingY">
          <h1>Home page</h1>

          <PostList />
      </div>
  );
}

export default HomePage;