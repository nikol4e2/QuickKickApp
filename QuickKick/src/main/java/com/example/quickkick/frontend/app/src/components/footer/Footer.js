import React from 'react'


import './footer.css'
import {Link} from "react-router-dom";

const Footer = () => {
    return (<footer className="footer-footer1 ">
            <div className="footer-max">
                <div className="footer-content">

                    <div className="footer-links">
                        <div className="footer-column1">
                            <strong className=" footer-column1-title">

                            </strong>
                            <div className="footer-footer-links1">
                                <Link to="/">Почетна</Link>

                                <Link to="/about-us">За Нас</Link>
                                <Link to="/registration">Пријавување</Link>
                                <Link to="/teams">Тимови</Link>
                                <Link to="/schedule">Распоред</Link>
                                <Link to="/results">Резултати</Link>
                            </div>
                        </div>

                        <div className="footer-column3">
                            <strong className=" footer-social-link1-title">

                            </strong>
                            <div className="footer-social-links">
                                <div className="footer-link14">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
                                    </svg>
                                    <a className="social-links" href="https://www.facebook.com/profile.php?id=61565357090815"><span className="spans-footer">Facebook</span></a>

                                </div>
                                <div className="footer-link15">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                                    </svg>

                                    <span className="spans-footer">Instagram</span>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-credits">
                    <div className="thq-divider-horizontal"></div>
                    <div className="footer-row">
                        <span className="spans-footer"></span>
                        <div className="footer-footer-links3">
                            <span className=" cc-1">© 2025 Меморијален турнир во мал фудбал - Андреј Митев</span>
                            <span className=" cc-2">Изработено од: Никола Арсов</span>

                        </div>
                    </div>
                </div>
            </div>
        </footer>)
}


export default Footer
