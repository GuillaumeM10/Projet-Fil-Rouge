import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
    const { user } = useContext(UserContext);
    const [burgerActive, setBurgerActive] = useState(false);

    useEffect(() => {
        setBurgerActive(false);
    }, []); 

    return ( 
        <nav className="mainNav defaultPaddingX">
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
                    <li>
                        <Link 
                            to="/account"
                            onClick={() => setBurgerActive(false)}
                        >
                            Account
                        </Link>
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
        </nav>
    );
}

export default Navbar;