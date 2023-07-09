import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
    const { user } = useContext(UserContext);
    const [burgerActive, setBurgerActive] = useState(false);

    return ( 
        <nav className="mainNav defaultPaddingX">
            <Link to="/" className="logo">
                <img src="/img/logo.svg" alt="" />
            </Link>

            <button 
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
                        <Link to="/account">Account</Link>
                    </li>
                }
                {!user.email && 
                    <>
                        <li>
                            <Link to="/auth/signin">Connexion</Link>
                        </li>
                        <li>
                            <Link to="/auth/signup">Inscription</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default Navbar;