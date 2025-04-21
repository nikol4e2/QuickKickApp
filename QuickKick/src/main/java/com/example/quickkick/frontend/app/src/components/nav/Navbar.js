import React from 'react';
import {Link} from "react-router-dom";
import "./navbar.css"
const Navbar = () => {
    return (
        <header className="navbar-container">
            <header data-thq="thq-navbar" className="navbar-navbar-interactive">
                <img
                    alt="ovdeLogo"
                    src=""
                    className="navbar-image1"
                />
                <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
                    <nav className="navbar-links1">
                        <span className="thq-body-small thq-link"><Link to="/">ДОМА</Link></span>
                        <span className="thq-body-small thq-link"><Link to="/matches">НАТПРЕВАРИ</Link></span>
                        <span className="thq-body-small thq-link"><Link to="/teams">ТИМОВИ</Link></span>
                        <span className="thq-body-small thq-link"><Link to="/results">РЕЗУЛТАТИ</Link></span>
                        <span className="thq-body-small thq-link"><Link to="/table">ТАБЕЛА</Link></span>
                        <span className="thq-body-small thq-link"><Link to="/photos">ФОТО АЛБУМ</Link></span>
                    </nav>
                    <div className="navbar-buttons1">
                        <button className="navbar-action11 thq-button-animated thq-button-filled">
                            <span className="thq-body-small">Action 1</span>
                        </button>
                        <button className="navbar-action21 thq-button-animated thq-button-outline">
                            <span className="thq-body-small">Action 2</span>
                        </button>
                    </div>
                </div>
                <div data-thq="thq-burger-menu" className="navbar-burger-menu">
                    <svg viewBox="0 0 1024 1024" className="navbar-icon1">
                        <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                </div>
                <div data-thq="thq-mobile-menu" className="navbar-mobile-menu">
                    <div className="navbar-nav">
                        <div className="navbar-top">
                            <img
                                alt="logoOvde"
                                src=""
                                className="navbar-logo"
                            />
                            <div data-thq="thq-close-menu" className="navbar-close-menu">
                                <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                                </svg>
                            </div>
                        </div>
                        <nav className="navbar-links2">
                            <span className="thq-body-small thq-link"><Link to="/">ДОМА</Link></span>
                            <span className="thq-body-small thq-link"><Link to="/matches">НАТПРЕВАРИ</Link></span>
                            <span className="thq-body-small thq-link"><Link to="/teams">ТИМОВИ</Link></span>
                            <span className="thq-body-small thq-link"><Link to="/results">РЕЗУЛТАТИ</Link></span>
                            <span className="thq-body-small thq-link"><Link to="/table">ТАБЕЛА</Link></span>
                            <span className="thq-body-small thq-link"><Link to="/photos">ФОТО АЛБУМ</Link></span>
                        </nav>
                    </div>
                    <div className="navbar-buttons2">
                        <button className="thq-button-filled">Login</button>
                        <button className="thq-button-outline">Register</button>
                    </div>
                </div>
            </header>
        </header>
    )
}


export default Navbar;