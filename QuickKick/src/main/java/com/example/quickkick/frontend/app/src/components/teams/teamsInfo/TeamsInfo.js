import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Service from "../../../repository/repository";

import "./teamsInfo.css"
const TeamsInfo = () => {


    const params= useParams();
    const teamId=params.id;

    const [team, setTeam] = React.useState(null);
    const [matches, setMatches] = React.useState([]);


    useEffect(() => {
        loadTeam();
        loadMatchesByTeam()

    },[])

    const loadTeam = () => {
        Service.fetchTeam(teamId).then(response => {setTeam(response.data)}).catch(error => console.log(error));
    }

    const loadMatchesByTeam= ()=>{
        Service.fetchMatchesByTeam(teamId).then(response =>{setMatches(response.data)}).catch(error => console.log(error));

    }


    const finishedMatches = matches.filter(match => match.status === "FINISHED");
    const upcomingMatches = matches.filter(match => match.status === "SCHEDULED");



    const printTeamGroup=() =>{
        switch(team.teamGroup){
            case "A": return "А";
            case "B": return "Б";
            case "C": return "C";
            case "D": return "D";
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 бидејќи месеците се 0-базирани
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ВРЕМЕ:${hours}:${minutes}`;
    };


    return (
        <div className="team-info-layout">
            {team && (
                <div className="team-details-box">
                    <h2>{team.name}</h2>
                    <p><strong>Група:</strong> {printTeamGroup()}</p>
                    <h3>Статистика во групна фаза</h3>
                    <hr/>
                    <p><strong>Победи:</strong> {team.wins}</p>
                    <p><strong>Порази:</strong> {team.losses}</p>
                    <p><strong>Нерешени:</strong> {team.draws}</p>
                    <p><strong>Поени:</strong> {team.points}</p>
                    <p><strong>Дадени голови:</strong> {team.scoredGoals}</p>
                    <p><strong>Примени голови:</strong> {team.takenGoals}</p>
                </div>
            )}

            <div className="matches-panel">
                <div className="matches-section">
                    <h3>✅ Завршени натпревари</h3>
                    {finishedMatches.length === 0 ? (
                        <p>Нема завршени натпревари</p>
                    ) : (
                        finishedMatches.map(match => (
                            <div key={match.id} className="match-box finished">
                                <div className="match-teams">
                                    {match.team1.name} <span className="match-score">{match.goalsTeam1} - {match.goalsTeam2}</span> {match.team2.name}
                                </div>
                                <div className="match-date">{formatDate(match.date)}</div>
                            </div>
                        ))
                    )}
                </div>

                <div className="matches-section">
                    <h3>📅 Следни натпревари</h3>
                    {upcomingMatches.length === 0 ? (
                        <p>Нема закажани натпревари</p>
                    ) : (
                        upcomingMatches.map(match => (
                            <div key={match.id} className="match-box upcoming">
                                <div className="match-teams">{match.team1.name} vs {match.team2.name}</div>
                                <div className="match-date">{formatDate(match.date)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );



};

export default TeamsInfo;