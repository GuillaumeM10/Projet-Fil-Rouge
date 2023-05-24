import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";

const Navbar = () => {
    const { user } = useContext(UserContext);

    return ( 
        <nav className="mainNav defaultPaddingX">
            <Link to="/" className="logo">
                <img src="/img/logo.svg" alt="" />
            </Link>

            <div className="searchBar">
                <input type="search" placeholder="WORK IN PROGRESS" />
                <button><img src="/img/search.svg" alt="" /></button>
            </div>
            
            <ul>
                {/* <li>
                    <Link to="/">Home</Link>
                </li>     */}
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