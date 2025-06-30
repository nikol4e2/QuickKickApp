import React, { useEffect, useState } from 'react';
import Service from "../../../repository/repository";
import "./lastThreeFinished.css";

const LastThreeFinishedMatches = ({data}) => {


    return (
        <div className="matches-wrapper">
            <h2>Последни завршени натпревари</h2>

            {data.length > 0 ? (
                <div className="matches-list">
                    {data.map(match => (
                        <div key={match.id} className="match-card">
                            <h3>{match.team1.name} - {match.team2.name}</h3>
                            <p className="result">Резултат: {match.goalsTeam1} - {match.goalsTeam2}</p>
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