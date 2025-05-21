import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./adminNavbar.css"
import {useAuth} from "../../Auth/AuthContext";

const AdminNav = () => {

    const {logout} = useAuth();

    const navigate = useNavigate();


    const logoutUser = () => {
        logout();
        navigate("/login");
    }
    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-container">
                <Link to="/admin" className="admin-navbar-brand">ADMIN PANEL</Link>

                <ul className="admin-navbar-menu">
                    <li className="admin-nav-item">
                        <Link to="/admin/teams" className="admin-nav-link">ТИМОВИ</Link>
                    </li>
                    <li className="admin-nav-item">
                        <Link to="/admin/players" className="admin-nav-link">ИГРАЧИ</Link>
                    </li>
                    <li className="admin-nav-item">
                        <Link to="/admin/matches" className="admin-nav-link">НАТПРЕВАРИ</Link>
                    </li>
                    <li className="admin-nav-item">
                        <Link to="/admin/generate-img">ГЕНЕРИРАЈ СЛИКА</Link>
                    </li>
                    <li>
                        <button onClick={logoutUser}>Одлогирај се!</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNav;