import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import "./matchesResults.css"
const MatchesResults = () => {

    const [matches, setMatches] = React.useState([]);

    useEffect(() => {
        loadFinishedMatches();
    },[])

    const loadFinishedMatches = () => {
        Service.fetchAllMatchesByStatus({ status: "FINISHED" })
            .then(results => {
                const sorted = results.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setMatches(sorted);
            })
            .catch(error => console.log(error));
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    return (
        <div className="results-container">
            <h2 className="results-title">Резултати од завршени натпревари</h2>
            {matches.length === 0 ? (
                <div className="spinner"></div>
            ) : (
                matches.map(match => (
                    <div key={match.id} className="results-match-box">
                        <div className="results-teams">
                            <span className="results-team">{match.team1.name}</span>
                            <span className="results-score">{match.goalsTeam1} - {match.goalsTeam2}</span>
                            <span className="results-team">{match.team2.name}</span>
                        </div>
                        <div className="results-date">{formatDate(match.date)}</div>
                    </div>
                ))
            )}
        </div>
    );

};

export default MatchesResults;