import {Outlet} from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";
import "../components/nav/navbar.css"
const MainLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>

    )
}
export default MainLayout;