import React, {useState} from 'react';
import "./matchesSection.css"
import TopTenPlayers from "../../topTenPlayers/TopTenPlayers";
import LastThreeFinishedMatches from "../lastThreeFinishedMatches/LastThreeFinishedMatches";
import UpcomingThreeMatches from "../../upcomingMatches/UpcomingThreeMatches";
const MatchesSection = () => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div className="thq-section-padding">
            <div className="features1-container2 thq-section-max-width">
                <div className="features1-image-container">
                    {activeTab === 0 && (
                        <LastThreeFinishedMatches></LastThreeFinishedMatches>
                    )}
                    {activeTab === 1 && (
                        <UpcomingThreeMatches></UpcomingThreeMatches>
                    )}
                    {activeTab === 2 && (
                        <TopTenPlayers></TopTenPlayers>
                    )}

                </div>
                <div className="features1-tabs-menu">
                    <div
                        onClick={() => setActiveTab(0)}
                        className="features1-tab-horizontal1"
                    >
                        <div className="features1-divider-container1">
                            {activeTab === 0 && <div className="features1-container3"></div>}
                        </div>
                        <div className="features1-content1">
                            <h2 className="thq-heading-2 ">Последни резултати</h2>
                            <span className="thq-body-small clickable-text">
                Резултати за последно одиграните натпревари!
              </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab(1)}
                        className="features1-tab-horizontal2"
                    >
                        <div className="features1-divider-container2">
                            {activeTab === 1 && <div className="features1-container4"></div>}
                        </div>
                        <div className="features1-content2">
                            <h2 className="thq-heading-2">Следни натпревари</h2>
                            <span className="thq-body-small clickable-text">
                Кликнете овде да ги видите информациите за следните натпревари!
              </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab(2)}
                        className="features1-tab-horizontal2"
                    >
                        <div className="features1-divider-container2">
                            {activeTab === 2 && <div className="features1-container4"></div>}
                        </div>
                        <div className="features1-content2">
                            <h2 className="thq-heading-2">Топ 10 стрелци</h2>
                            <span className="thq-body-small clickable-text">
                Кликнете овде да ги видите моменталните ТОП10 Стрелци!
              </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MatchesSection;