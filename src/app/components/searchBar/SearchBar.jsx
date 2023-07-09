import React, { useEffect, useRef, useState } from 'react';
import UserService from '../../../setup/services/user.service';
import PostService from '../../../setup/services/post.service';

const SearchBar = ({ burgerActive }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [type, setType] = useState("posts");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchInputClick = () => {
    setFocused(true);
  };

  

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const debouncedOnChange = debounce(handleSearch);

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      if(type === "users"){
        try {
          const data = await UserService.getAll(`search=${search}`);
          setData(data);
          if(data.length === 0) setError("Pas de résultats");
          else setError("");
        } catch (error) {
          console.log(error.response.data.message);
        }
      }else if(type === "posts"){
        try {
          const data = await PostService.getAll(`search=${search}`);
          setData(data);
          if(data.length === 0) setError("Pas de résultats");
          else setError("");
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
      setLoading(false)
    };
    
    if (search.length > 1) {      
      getData();
    } else {
      setData([]);
    }
  }, [search, type]);

  return (
    <div className={`searchBarContainer ${burgerActive ? "active" : ""}`}>

      <div className="searchBar">
          <input 
            type="search" 
            placeholder="Rechercher"
            onChange={e => {
              debouncedOnChange(e)
              e.persist();
              if(e.target.value === "") setData([]);
              if(e.target.value.length > 0) e.target.parentElement.classList.add("cross");
              else e.target.parentElement.classList.remove("cross");
            }}
            onFocus={() => setFocused(true)}
            onClick={handleSearchInputClick}
          />
          <img src="/img/search.svg" alt="" />
      </div>

      {focused && search.length > 1 && (
        <div className="results" ref={resultsRef}>
          <div className="btns">
            <button 
              className={type === "posts" ? "posts active" : "posts"}
              onClick={() => setType("posts")} 
            >
              Posts
            </button>
            <button 
              className={type === "users" ? "users active" : "users"}
              onClick={() => setType("users")}
            >
              Utilisateurs
            </button>
          </div>
          <ul className="data">
            {!error && !loading ? (data.map((item) => (
              <li key={item.id}>
                {type === "posts" && item.published === true ? (

                  <a href={`/posts/${item.id}`}>
                    {item.content && (() => {
                      const regex = /(<([^>]+)>)/ig;
                      let result = item.content.replace(regex, ' ');
                      if(result.length > 25) result = result.slice(0, 25) + "...";
                      return <>{result}</>;
                    })()}
                  </a>

                ) : item.userDetail?.profilComplet === true && item.userDetail?.displayedOnFeed === true && (

                  <a href={`/profile/${item.id}`}>
                    {item.userDetail?.profilePicture?.Location ? (
                      <img src={item.userDetail.profilePicture.Location} alt="" />
                    ): (
                      <img src="/img/profil.svg" alt="" />
                    )}
                    {item.firstName} {item.lastName}
                  </a>

                )}
              </li>
            ))) : (() => {
              if(error) return <li><p className='error'>{error}</p></li>;
              if(loading) return <li><p className='error'>Chargement...</p></li>;
            })()}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;