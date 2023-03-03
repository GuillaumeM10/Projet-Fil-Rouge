import Navbar from "../components/ui/Navbar";

const MainLayout = ({children}) => {
    return ( 
        <div>
            <Navbar />

            <div>
                {children}
            </div>
        </div>
    );
}

export default MainLayout;