import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import {Link} from "react-router-dom";
import "./listLiveMatch.css"
import matchesList from "../../../AdminPanel/matches/matchesList/matchesList";
const ListLiveMatch = () => {


    const [liveMatch, setLiveMatch] = React.useState(null);
    useEffect(() => {
        loadMatch();
    },[])

    const loadMatch = () => {
        Service.fetchAllMatchesByStatus({ status: "PLAYING" })
            .then((response) => {
                if (response.data.length > 0) {
                    const matchId = response.data[0].id;
                    loadLiveMatch(matchId);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadLiveMatch = (matchId) => {

        Service.fetchPlayingMatchByMatchId(matchId).then((response) => {setLiveMatch(response.data);}).catch((error) => {console.log(error)});
    }
    return (
        <div className="live-match-container">
            <div>Натпревар кој моментално се одржува:</div>
            {liveMatch ? (
                 <div className="live-match-card">
                    <p>{liveMatch.match.team1.name} - {liveMatch.match.team2.name}</p>
                    <Link to={`/live/${liveMatch.id}`}>
                        <button>СЛЕДИ ГО НАТПРЕВАРОТ ВО ЖИВО</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <div>Нема тековни натпревари.</div>
                    <div>Обидете се повторно во термин кога има закажано натпревар.</div>
                </div>
            )}
        </div>
    );
};

export default ListLiveMatch;