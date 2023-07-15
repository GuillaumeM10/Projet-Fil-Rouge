import { useEffect, useState } from "react";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import { useLocation } from "react-router-dom";

const MainLayout = ({children}) => {
    const [page, setPage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split("/");
        setPage(path[path.length - 1]);
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