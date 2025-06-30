import React, {useEffect, useState} from 'react';
import "./matchesSection.css"
import TopTenPlayers from "../../topTenPlayers/TopTenPlayers";
import LastThreeFinishedMatches from "../lastThreeFinishedMatches/LastThreeFinishedMatches";
import UpcomingThreeMatches from "../../upcomingMatches/UpcomingThreeMatches";
import Service from "../../../repository/repository";
const MatchesSection = () => {
    const [activeTab, setActiveTab] = useState(0)


    const [lastMatches, setLastMatches] = useState([])
    const [upcomingMatches, setUpcomingMatches] = useState([])
    const [topTenPlayers, setTopTenPlayers] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [lastMat, upcomming,topPlayers]= await Promise.all([
                    Service.loadLastMatches(),
                    Service.fetchUpcomingMatches(),
                    Service.fetchTopTenPlayers()
                ]);

                setLastMatches(lastMat.data);
                setUpcomingMatches(upcomming.data)
                setTopTenPlayers(topPlayers.data);
            }catch(error){
                console.error("Error fetching data: ", error)
            }finally {
                setLoading(false);
            }
        };

        fetchAllData();

    },[]);

    return (
        <div className="thq-section-padding">
            <div className="features1-container2 thq-section-max-width">
                <div className="features1-image-container">
                    {loading ? (
                        <div className="spinner"></div>
                    ) : activeTab === 0 ? (
                        <LastThreeFinishedMatches data={lastMatches} />
                    ) : activeTab === 1 ? (
                        <UpcomingThreeMatches data={upcomingMatches} />
                    ) : (
                        <TopTenPlayers data={topTenPlayers} />
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