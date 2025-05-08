import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="navbar-container">
            <header data-thq="thq-navbar" className="navbar-navbar-interactive">
                <img alt="Logo" src="/images/LOGO.jpg" className="navbar-image1" />

                {/* Desktop Menu */}
                <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
                    <nav className="navbar-links1">
                        <span className="thq-body-small thq-link link-nav"><Link to="/">ПОЧЕТНА</Link></span>
                        <span className="thq-body-small thq-link link-nav"><Link to="/about-us">ЗА НАС</Link></span>
                        <span className="thq-body-small thq-link link-nav"><Link to="/registration">ПРИЈАВУВАЊЕ</Link></span>
                        <span className="thq-body-small thq-link link-nav"><Link to="/teams">ТИМОВИ</Link></span>
                        <span className="thq-body-small thq-link link-nav"><Link to="/schedule">РАСПОРЕД</Link></span>
                        <span className="thq-body-small thq-link link-nav"><Link to="/results">РЕЗУЛТАТИ</Link></span>



                        <span className="thq-body-small thq-link"><Link to="/photos">ГАЛЕРИЈА</Link></span>
                        <span className="thq-body-small thq-link"><Link to="/contact">КОНТАКТ</Link></span>
                    </nav>
                    <div className="navbar-buttons1">

                        <Link className="navbar-action11 thq-button-animated thq-button-filled watch-live-button" to="/live">РЕЗУЛТАТИ ВО ЖИВО</Link>

                    </div>
                </div>


                <div data-thq="thq-burger-menu" className="navbar-burger-menu" onClick={() => {setIsMobileMenuOpen(true); }}>
                    <svg viewBox="0 0 1024 1024" className="navbar-icon1">
                        <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z" />
                    </svg>
                </div>


                <div data-thq="thq-mobile-menu" className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : 'hidden'}`}>
                    <div className="navbar-nav">
                        <div className="navbar-top">
                            <img alt="logoOvde" src="/images/LOGO.jpg" className="navbar-logo" />
                            <div data-thq="thq-close-menu" className="navbar-close-menu" onClick={() => setIsMobileMenuOpen(false)}>
                                <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" />
                                </svg>
                            </div>
                        </div>
                        <nav className="navbar-links2">
                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/">ПОЧЕТНА</Link></span>
                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/about-us">ЗА НАС</Link></span>
                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/registration">ПРИЈАВУВАЊЕ</Link></span>
                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/teams">ТИМОВИ</Link></span>
                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/schedule">РАСПОРЕД</Link></span>
                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/results">РЕЗУЛТАТИ</Link></span>

                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/photos">ГАЛЕРИЈА</Link></span>
                            <span className="thq-body-small thq-link" onClick={() => setIsMobileMenuOpen(false)}><Link to="/КОНТАКТ">КОНТАКТ</Link></span>
                        </nav>
                    </div>
                    <div className="navbar-buttons2">
                        <button className="thq-button-filled"><Link onClick={() => setIsMobileMenuOpen(false)} to="/live"> <span className="thq-body-small">РЕЗУЛТАТИ ВО ЖИВО</span></Link></button>

                    </div>
                </div>
            </header>
        </header>
    );
}

export default Navbar;
