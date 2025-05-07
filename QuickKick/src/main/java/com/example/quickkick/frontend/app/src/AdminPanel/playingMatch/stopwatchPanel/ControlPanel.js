import React, {use, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Service from "../../../repository/repository";
import "./ControlPanel.css"
import AddGoalAfterMatch from "./AddGoalAfterMatch";
const ControlPanel = () => {

    const params=useParams();
    const id=params.id;


    const [matchData, setMatchData] = React.useState(null);
    const [remainingTime, setRemainingTime] = React.useState(0);

    const [finishMatchToggle, setFinishMatchToggle] = React.useState(false);
    const [isGroupStage, setIsGroupStage] = React.useState(null);

    const handleClickOnFinish = () => {
        if(isGroupStage===null){
            alert("Избери дали натпреварот е од групна фаза.");
            return
        }
        setFinishMatchToggle(true);




        Service.finishMatch(matchData.match.id,{goalsTeam1: matchData.goalsTeam1, goalsTeam2: matchData.goalsTeam2, isGroupPhase:isGroupStage});
    }


    useEffect(() => {
        Service.fetchPlayingMatch(id).then(result=>{
            setMatchData(result.data)

            const totalTime=result.data.minutesForHalfTime*60;
            setRemainingTime(totalTime);
        }).catch(err=>{console.log("Error loading match: ",err)})
    }, []);


    const channel = new BroadcastChannel("timer_control");

    const sendCommand = (type, payload=null) => {
        channel.postMessage({type, payload});
    };




    if(matchData==null) {
        return <div>Loading</div>
    }
    return (
        <>
        <div className="control-panel">
            <div className="team-section-control">
                <h3>{matchData.match.team1.name}</h3>
                <div>
                    <div className="goal-numbers-control">Голови: {matchData.goalsTeam1}</div>
                    <button onClick={() => {sendCommand("ADD_GOAL_TEAM_1");   setMatchData(prev=>({...prev, goalsTeam1: prev.goalsTeam1+1})); }}>Додади гол на Тим 1</button>
                    <button onClick={() => {sendCommand("SUB_GOAL_TEAM_1");  setMatchData(prev=>({...prev, goalsTeam1: prev.goalsTeam1-1})) }}>Одземи гол на Тим 1</button>
                </div>

                <div>
                    <div className="goal-numbers-control">Фаули {matchData.faulsTeam1}</div>
                    <button onClick={() => {sendCommand("ADD_FAUL_TEAM_1"); setMatchData(prev=>({...prev, faulsTeam1: prev.faulsTeam1+1})) }}>Додади Фаул на Тим 1</button>
                    <button onClick={() => {sendCommand("SUB_FAUL_TEAM_1"); setMatchData(prev=>({...prev, faulsTeam1: prev.faulsTeam1-1})) }}>Одземи Фаул на Тим 1</button>
                </div>

            </div>

            <div className="team-section-control">
                <h3>{matchData.match.team2.name}</h3>
                <div>
                    <div className="goal-numbers-control">Голови: {matchData.goalsTeam2}</div>
                    <button onClick={() => {sendCommand("ADD_GOAL_TEAM_2"); setMatchData(prev=>({...prev, goalsTeam2: prev.goalsTeam2+1})) }}>Додади гол на Тим 2</button>
                    <button onClick={() => {sendCommand("SUB_GOAL_TEAM_2"); setMatchData(prev=>({...prev, goalsTeam2: prev.goalsTeam2-1})) }}>Одземи гол на Тим 2</button>
                </div>
                <div>
                    <div className="goal-numbers-control">Фаули {matchData.faulsTeam2}</div>
                    <button onClick={() => {sendCommand("ADD_FAUL_TEAM_2"); setMatchData(prev=>({...prev, faulsTeam2: prev.faulsTeam2+1 }))}}>Додади Фаул на Тим 2</button>
                    <button onClick={() => {sendCommand("SUB_FAUL_TEAM_2"); setMatchData(prev=>({...prev, faulsTeam2: prev.faulsTeam2-1})) }}>Одземи Фаул на Тим 2</button>
                </div>
            </div>


            <div className="timer-controls">
                <h3>КОНТРОЛИ ТАЈМЕР</h3>
                <button onClick={() => sendCommand("START_TIMER")}>Старт</button>
                <button onClick={() => sendCommand("PAUSE_TIMER")}>Пауза</button>
                <button onClick={() => sendCommand("SET_TIMEOUT_TIMER")}>Тајмаут</button>

            </div>


            <div className="finish-match-controll">
                <h3>Заврши го натпреварот</h3>
                <h4>ИЗБЕРИ:</h4>
                <label>
                    <input
                        type="radio"
                        name="phase"
                        value="true"
                        onChange={() => setIsGroupStage(true)}
                    />
                    Групна фаза
                </label>
                <label>
                    <input
                        type="radio"
                        name="phase"
                        value="false"
                        onChange={() => setIsGroupStage(false)}
                    />
                    Елиминациска фаза
                </label>

                <button onClick={handleClickOnFinish}>Заврши натпревар</button>


            </div>

        </div>
            {finishMatchToggle && <AddGoalAfterMatch matchId={matchData.match.id} team1={matchData.match.team1} team2={matchData.match.team2} goalsTeam1={matchData.goalsTeam1} goalsTeam2={matchData.goalsTeam2}></AddGoalAfterMatch>}
        </>
    );

};

export default ControlPanel;