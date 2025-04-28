import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import "./lastThreeFinished.css"
const LastThreeFinishedMatches = () => {

    const [lastMatches, setLastMatches] = React.useState([]);

    useEffect(() => {
        loadLastMatches()
    },[])


    const loadLastMatches = () => {
        Service.loadLastMatches().then(response => {setLastMatches(response.data);}).catch(error => console.log(error));
    }
    return (
        <div>
            {lastMatches.length > 0 ? (
                <div className="matches-list">
                    {lastMatches.map((match) => (
                        <div key={match.id} className="match-card">
                            <h3>{match.team1.name} - {match.team2.name}</h3>
                            <p className={"result"}>Резултат: {match.goalsTeam1} - {match.goalsTeam2}</p>
                            <p>Датум: {new Date(match.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Нема завршени натпревари.</p>
            )}
        </div>
    );
};

export default LastThreeFinishedMatches;