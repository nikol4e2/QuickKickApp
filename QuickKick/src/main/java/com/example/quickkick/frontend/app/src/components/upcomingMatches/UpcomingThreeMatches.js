import React, {useEffect} from 'react';
import Service from "../../repository/repository";
import "./UpcomingThreeMatches.css"
const UpcomingThreeMatches = () => {

    const [matches, setMatches] = React.useState([]);

    useEffect(() => {
        loadUpcomingMatches();
    },[]);

    const loadUpcomingMatches = () => {
        Service.fetchUpcomingMatches().then((response) => {setMatches(response.data);}).catch((error) => {console.log(error)});
    }
    return (
        <div className="upcoming-matches-container">
            {matches.length > 0 ? (
                <div className="upcoming-matches-list">
                    {matches.map((match) => (
                        <div key={match.id} className="upcoming-match-card">
                            <h3 className="match-title">{match.team1.name} - {match.team2.name}</h3>
                            <p className="match-date">Дата: {new Date(match.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-upcoming-matches">Нема следни натпревари.</p>
            )}
        </div>
    );
};

export default UpcomingThreeMatches;