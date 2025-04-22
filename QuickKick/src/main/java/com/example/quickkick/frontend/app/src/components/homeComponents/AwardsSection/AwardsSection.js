import React from 'react'

import PropTypes from 'prop-types'

import "./awardssection.css"

const Steps = (props) => {
    return (
        <div className="steps-container1 thq-section-padding">
            <span className="heading-awards">Награден фонд</span>

            <div className="steps-max-width thq-section-max-width">
                <div className="steps-container2 thq-grid-2">
                    <div className="steps-container3">

                        <div className="steps-container4 thq-card">
                            <h2 className="thq-heading-2">Прво место</h2>
                            <span className="steps-text11 thq-body-small">80 000МКД</span>
                            <label className="steps-text12 thq-heading-3">01</label>
                        </div>

                        <div className="steps-container5 thq-card">
                            <h2 className="thq-heading-2">Второ место</h2>
                            <span className="steps-text14 thq-body-small">40 000МКД</span>
                            <label className="steps-text15 thq-heading-3">02</label>
                        </div>

                        <div className="steps-container6 thq-card">
                            <h2 className="thq-heading-2">Трето место</h2>
                            <span className="steps-text17 thq-body-small">20 000МКД</span>
                            <label className="steps-text18 thq-heading-3">03</label>
                        </div>

                        <div className="steps-container7 thq-card">
                            <h2 className="thq-heading-2">Најдобар играч / стерелец / голман</h2>
                            <span className="steps-text20 thq-body-small">3 000МКД</span>
                            <label className="steps-text21 thq-heading-3"></label>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

Steps.defaultProps = {
    step3Description:
        'Explore match statistics, scores, and other relevant information to stay updated with the latest soccer match results.',
    step1Title: 'Прво место',
    step4Description:
        'Bookmark matches, set reminders, and receive notifications to never miss out on any important soccer match updates.',
    step3Title: 'View Match Details',
    step1Description:
        'Enter the team names or match details to search for the desired soccer match results.',
    step4Title: 'Stay Informed',
    step2Title: 'Select Match',
    step2Description:
        'Choose the specific match from the search results to view detailed information and results.',
}

Steps.propTypes = {
    step3Description: PropTypes.string,
    step1Title: PropTypes.string,
    step4Description: PropTypes.string,
    step3Title: PropTypes.string,
    step1Description: PropTypes.string,
    step4Title: PropTypes.string,
    step2Title: PropTypes.string,
    step2Description: PropTypes.string,
}

export default Steps
