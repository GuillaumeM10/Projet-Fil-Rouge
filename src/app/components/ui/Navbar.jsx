import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import SearchBar from "../searchBar/SearchBar";
import UserService from "../../../setup/services/user.service";

const Navbar = () => {
    const { user } = useContext(UserContext);
    const [newUser, setNewUser] = useState({});
    const [burgerActive, setBurgerActive] = useState(false);

    useEffect(() => {
        setBurgerActive(false);
    }, []); 

    useEffect(() => {
        const getUser = async () => {
            if(isNaN(user.id)) return
            try {
                const data = await UserService.getOneById(user.id);
                setNewUser(data);
            } catch (error) {
                console.log({ type: 'error', message: error.response.data.message });
            }
        };
        getUser(); 
    }, [user.id]);

    return ( 
        <nav className="mainNav defaultPaddingX">
            <div 
                className="navContainer"
            >

                <Link 
                    to="/" 
                    className="logo"
                    onClick={() => setBurgerActive(false)}
                >
                    <img src="/img/logo.svg" alt="" />
                </Link>

                <button 
                    type='button'
                    className={`burger ${burgerActive ? "active" : ""}`}
                    onClick={() => {
                        const oldBurgerActive = burgerActive;
                        setBurgerActive(!oldBurgerActive)
                    }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <SearchBar burgerActive={burgerActive} />
                
                <ul className={`list ${burgerActive ? "active" : ""}`}>
                    {user.email && 
                        <li className="account">
                            <Link 
                                to="/account"
                                onClick={() => setBurgerActive(false)}
                            >
                                Mon compte
                            </Link>
                            {newUser.userDetail?.personalPicture ? (
                                <img className='pp' height="30 "width="30" src={newUser.userDetail?.personalPicture?.Location} alt="profile" />
                            ): (
                                <img className='pp' height="30 "width="30" src="/img/default_pp.webp" alt="profile" />
                            )}
                        </li>
                    }
                    {!user.email && 
                        <>
                            <li>
                                <Link 
                                    to="/auth/signin"
                                    onClick={() => setBurgerActive(false)}
                                >
                                    Connexion
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/auth/signup"
                                    onClick={() => setBurgerActive(false)}
                                >
                                    Inscription
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;