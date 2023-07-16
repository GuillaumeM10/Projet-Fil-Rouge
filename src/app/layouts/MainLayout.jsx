import { useEffect, useState } from "react";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import { useLocation } from "react-router-dom";

const MainLayout = ({children}) => {
    const [page, setPage] = useState('');
    const location = useLocation();

    useEffect(() => {
        let path = location.pathname.split("/");
        path = path.join(" ");
        setPage(path);
    }, [location]);

    return ( 
        <div
            className={`mainLayout ${ location.pathname === '/' ? 'home' : page }`}
        >
            <Navbar />

            <div className="defaultPaddingX defaultPaddingY">
                {children}
            </div>

            <Footer />
        </div>
    );
}

export default MainLayout;