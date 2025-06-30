import React, {useEffect} from 'react';
import Service from "../../repository/repository";
import "./UpcomingThreeMatches.css"
const UpcomingThreeMatches = ({data}) => {


    return (
        <div className="upcoming-matches-container">
            {data.length > 0 ? (
                <div className="upcoming-matches-list">
                    {data.map((match) => (
                        <div key={match.id} className="upcoming-match-card">
                            <h3 className="match-title">{match.team1.name} - {match.team2.name}</h3>
                            <p className="match-date-upcoming">
                                Датум: {new Date(match.date).toLocaleDateString('mk-MK', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date(match.date).toLocaleTimeString('mk-MK', { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </p>
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