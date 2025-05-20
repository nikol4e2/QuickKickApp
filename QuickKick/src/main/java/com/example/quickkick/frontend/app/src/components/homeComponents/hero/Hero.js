import React, {useEffect} from 'react'


import Script from 'react-dangerous-html'

import './hero.css'
import {Link} from "react-router-dom";

const Hero = () => {


    return (
        <div className="hero-header78">
            <div className="hero-column thq-section-max-width thq-section-padding">
                <div className="hero-content1">
                    <h1 className="hero-text1 thq-heading-1 ml2" >МЕМОРИЈАЛЕН ТУРНИР ВО МАЛ ФУДБАЛ <br/> АНДРЕЈ МИТЕВ </h1>
                    <p className="hero-text2 thq-body-large ">Меморијалниот турнир во мал фудбал „Андреј Митев“ е настан кој обединува спорт, пријателство и почит кон еден наш драг пријател. Турнирот се одржува со цел да се оддаде чест на Андреј, преку натпревари исполнети со фер-плеј, тимска енергија и спортски дух.</p>
                </div>
                <div className="hero-actions">

                    <Link className="navbar-action11 thq-button-animated thq-button-filled watch-live-button" to="/live">РЕЗУЛТАТИ ВО ЖИВО</Link>

                        <Link className="thq-button-outline hero-button2 thq-body-small get-results-button" to={"/results"}>РЕЗУЛАТАТИ ОД ЗАВРЕШНИ НАТПРЕВАРИ</Link>

                </div>
            </div>
            <div className="hero-content2">
                <div className="hero-row-container1 thq-mask-image-horizontal thq-animated-group-container-horizontal">
                    <div className="thq-animated-group-horizontal">
                        <img
                            alt="SLIKA"
                            src="/images/1IstoJaka.jpg"
                            className="hero-placeholder-image10 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/1.jpg"
                            className="hero-placeholder-image11 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/1!!!.jpg"
                            className="hero-placeholder-image12 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/2.jpg"
                            className="hero-placeholder-image13 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/3.jpg"
                            className="hero-placeholder-image14 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/4.jpg"
                            className="hero-placeholder-image15 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                    <div className="thq-animated-group-horizontal">
                        <img
                            alt="SLIKA"
                            src="/images/5.jpg"
                            className="hero-placeholder-image16 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/6.jpg"
                            className="hero-placeholder-image17 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/7.jpg"
                            className="hero-placeholder-image18 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/8.jpg"
                            className="hero-placeholder-image19 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/9.jpg"
                            className="hero-placeholder-image20 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="slika"
                            src="/images/10.jpg"
                            className="hero-placeholder-image21 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                </div>
                <div className="hero-row-container2 thq-mask-image-horizontal thq-animated-group-container-horizontal">
                    <div className="thq-animated-group-horizontal-reverse">
                        <img
                            alt="SLIKA"
                            src="/images/11.jpg"
                            className="hero-placeholder-image22 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/12.jpg"
                            className="hero-placeholder-image23 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/13.jpg"
                            className="hero-placeholder-image24 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/14.jpg"
                            className="hero-placeholder-image25 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/15.jpg"
                            className="hero-placeholder-image26 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/16.jpg"
                            className="hero-placeholder-image27 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                    <div className="thq-animated-group-horizontal-reverse">
                        <img
                            alt="SLIKA"
                            src="/images/17.jpg"
                            className="hero-placeholder-image28 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/18.jpg"
                            className="hero-placeholder-image29 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/19.jpg"
                            className="hero-placeholder-image30 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/20.jpg"
                            className="hero-placeholder-image31 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/21.jpg"
                            className="hero-placeholder-image32 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="SLIKA"
                            src="/images/22.jpg"
                            className="hero-placeholder-image33 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="hero-container2">
                    <Script
                        html={`<style>
  @keyframes scroll-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 16px));
    }
  }

  @keyframes scroll-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - 16px));
    }
  }
</style>
`}
                    ></Script>
                </div>
            </div>

        </div>
    )
}







export default Hero