import React, {useEffect} from 'react'



import "./awardssection.css"

const Steps = () => {
    useEffect(() => {
        // Почекај anime да се вчита
        if (window.anime) {
            // Wrap every letter in a span
            const textWrapper = document.querySelector('.ml2');
            if (textWrapper) {
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                window.anime.timeline({ loop: true })
                    .add({
                        targets: '.ml2 .letter',
                        scale: [4, 1],
                        opacity: [0, 1],
                        translateZ: 0,
                        easing: "easeOutExpo",
                        duration: 950,
                        delay: (el, i) => 70 * i
                    }).add({
                    targets: '.ml2',
                    opacity: 0,
                    duration: 1000,
                    easing: "easeOutExpo",
                    delay: 1000
                });
            }
        }
    }, []);
    return (
        <div className="steps-container1 thq-section-padding">
            <span className="heading-awards ml2">Награден фонд</span>

            <div className="steps-max-width thq-section-max-width">
                <div className="steps-container2 thq-grid-2">
                    <div className="steps-container3">

                        <div className="steps-container4 thq-card">
                            <h2 className="thq-heading-2 position">Прво место</h2>
                            <span className="steps-text11 thq-body-small valut">80.000МКД</span>
                            <label className="steps-text12 thq-heading-3">01</label>
                        </div>

                        <div className="steps-container5 thq-card">
                            <h2 className="thq-heading-2 position">Второ место</h2>
                            <span className="steps-text14 thq-body-small valut">40.000МКД</span>
                            <label className="steps-text15 thq-heading-3">02</label>
                        </div>

                        <div className="steps-container6 thq-card">
                            <h2 className="thq-heading-2 position">Трето место</h2>
                            <span className="steps-text17 thq-body-small valut">20.000МКД</span>
                            <label className="steps-text18 thq-heading-3">03</label>
                        </div>

                        <div className="steps-container7 thq-card">
                            <h2 className="thq-heading-2 position">Најдобар играч / стерелец / голман</h2>
                            <span className="steps-text20 thq-body-small valut">3.000МКД</span>
                            <label className="steps-text21 thq-heading-3"></label>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}



export default Steps
