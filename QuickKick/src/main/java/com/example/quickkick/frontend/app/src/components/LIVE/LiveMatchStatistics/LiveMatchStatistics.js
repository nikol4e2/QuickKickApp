import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import Service from "../../../repository/repository";
import "./LiveMatchStatistics.css"

const goalSound = new Audio(process.env.PUBLIC_URL + "/sounds/goal.mp3");
const LiveMatchStatistics = () => {

    const params= useParams();
    const playingMatchId=params.id;

    const [liveMatch, setLiveMatch] = React.useState(null);

    const prevGoals= useRef({team1:null, team2:null});
    const initialized =useRef(false);
    const [highlight, setHighlight] = React.useState(false);
    useEffect(()=>{

        loadPlayingMatch();

        const interval = setInterval(()=>{
            loadPlayingMatch();
        },30000)

        return () => { clearInterval(interval) };
    },[])




    const loadPlayingMatch =  () => {
        Service.fetchPlayingMatch(playingMatchId).then(response => {
            setLiveMatch(response.data);

            const newMatch = response.data;
            if (!initialized.current) {

                prevGoals.current = {
                    team1: newMatch.goalsTeam1,
                    team2: newMatch.goalsTeam2
                };
                initialized.current = true;
            } else {

                if (
                    prevGoals.current.team1 !== newMatch.goalsTeam1 ||
                    prevGoals.current.team2 !== newMatch.goalsTeam2
                ) {
                    goalSound.play().catch(err => console.log("Sound error:", err));
                    setHighlight(true);
                    setTimeout(() => setHighlight(false), 1500);


                    prevGoals.current = {
                        team1: newMatch.goalsTeam1,
                        team2: newMatch.goalsTeam2
                    };
                }
            }
        })
            .catch(error => {console.log(error)});
    }
    let match, timer, goalsTeam1, goalsTeam2, faulsTeam1, faulsTeam2, halfTimeCounter,status;

    if (liveMatch) {
        ({ match, timer, goalsTeam1, goalsTeam2, faulsTeam1, faulsTeam2, halfTimeCounter, status } = liveMatch);
    }


    const translateStatus=  (status)=> {
       switch (status) {
           case "WAITING_TO_START": return "СЕ ЧЕКА ПОЧЕТОК"
           case "PLAYING": return "СЕ ИГРА"
           case "HALF_TIME_TIMEOUT": return "ПАУЗА ЗА ПОЛУВРЕМЕ"
           case "TEAM_TIMEOUT": return "ТИМСКИ ТАЈМОУТ"
           case "FINISHED": return "ЗАВРШЕН"
       }
    }
    return (
        <div className="container">
            {liveMatch && <div className={`live-scoreboard ${highlight ? 'goal-highlight' : ''}`}>
                <div className="teams-live">
                    <div className="team-left">
                        <h2>{match.team1.name}</h2>
                        <p>Фаули: {faulsTeam1}</p>
                    </div>
                    <div className="score">
                        <span>{goalsTeam1}</span>
                        <span>|</span>
                        <span>{goalsTeam2}</span>
                    </div>
                    <div className="team-right">
                        <h2>{match.team2.name}</h2>
                        <p>Фаули: {faulsTeam2}</p>
                    </div>
                </div>
                <div className="match-info">
                    <span>⏱ {timer} минути  преостанато</span>
                    <span>ПЕРИОДА: {halfTimeCounter}</span>
                    <span>СТАТУС: {translateStatus(status)}</span>
                </div>
            </div>}

        </div>
    );
};

export default LiveMatchStatistics;