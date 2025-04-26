import React from 'react';
import { Link} from "react-router-dom";
import "./adminNavbar.css"

const AdminNav = () => {
    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-container">
                <Link to="/admin" className="admin-navbar-brand">ADMIN PANEL</Link>

                <ul className="admin-navbar-menu">
                    <li className="admin-nav-item">
                        <Link to="/admin/teams" className="admin-nav-link">Teams</Link>
                    </li>
                    <li className="admin-nav-item">
                        <Link to="/admin/players" className="admin-nav-link">Players</Link>
                    </li>
                    <li className="admin-nav-item">
                        <Link to="/admin/matches" className="admin-nav-link">Matches</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNav;