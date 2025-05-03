import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import {useParams} from "react-router-dom";
import "./Stopwatch.css"
const StopWatch = () => {

    const params= useParams();
    const id = params.id;



    const [remainingTime, setRemainingTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);



    const [matchData, setMatchData] = React.useState(null);

    useEffect(() => {
        Service.fetchPlayingMatch(id).then(result=>{
            setMatchData(result.data)

            const totalTime=result.data.minutesForHalfTime*60;
            setRemainingTime(totalTime);
        }).catch(err=>{console.log("Error loading match: ",err)})
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning && remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(prev => {
                    const newTime = prev - 1;


                    if (newTime > 0 && newTime % 60 === 0) {
                        Service.signalMinutePassed(id)
                            .catch(err => console.log("Error notifying backend:", err));
                    }

                    if (newTime <= 0) {
                        clearInterval(interval);
                        return 0;
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, remainingTime]);

    const startTimer = () =>{
        setIsRunning(true);

    }
    const stopTimer = () =>{
        setIsRunning(false);

    }
    const addGoalToTeam = (teamNumber) => {
        if (teamNumber === 1)
        {
            setMatchData(prev=>({...prev, goalsTeam1: prev.goalsTeam1+1}));
        }else if(teamNumber === 2)
        {
            setMatchData(prev=>({...prev, goalsTeam2: prev.goalsTeam2+1}));
        }else return;

        Service.addGoalToTeam(id, teamNumber).catch(error=>{console.log(error)});
    }

    const subGoalFromTeam = (teamNumber) =>{
        if(teamNumber===1)
        {
            setMatchData(prev=>({...prev, goalsTeam1: prev.goalsTeam1-1}));

        }else if(teamNumber===2)
        {
            setMatchData(prev =>({...prev, goalsTeam2: prev.goalsTeam2-1}));
        }else return;

        Service.subGoalFromTeam(id, teamNumber).catch(error=>{console.log(error)});
    }

    const addFaulToTeam = (teamNumber) =>{
        if(teamNumber===1)
        {
            setMatchData(prev=>({...prev, faulsTeam1: prev.faulsTeam1+1}))
        }else if(teamNumber===2)
        {
            setMatchData(prev=>({...prev, faulsTeam2: prev.faulsTeam2+1}))
        } else return

        Service.addFaulToTeam(id, teamNumber).catch(error=>{console.log(error)});
    }

    const subFaulFromTeam = (teamNumber) =>{
        if(teamNumber===1)
        {
            setMatchData(prev=>({...prev, faulsTeam1: prev.faulsTeam1-1}))
        }else if(teamNumber===2)
        {
            setMatchData(prev=>({...prev, faulsTeam2: prev.faulsTeam2-1}))
        } else return

        Service.subFaulFromTeam(id, teamNumber).catch(error=>{console.log(error)});
    }

    const setTimeoutToTimer= () =>{

    }

    const setBreakToTimer= () =>{

    }
    const setTimer = (seconds) =>{

    }


    useEffect(() => {
        const channel = new BroadcastChannel("timer_control");

        channel.onmessage = (event) => {
            const { type, payload } = event.data;


            switch (type) {
                case "START_TIMER":
                    startTimer();
                    break;
                case "PAUSE_TIMER":
                    stopTimer();
                    break
                case "ADD_GOAL_TEAM_1":
                    addGoalToTeam(1);
                    break
                case "ADD_GOAL_TEAM_2":
                    addGoalToTeam(2);
                    break
                case "SUB_GOAL_TEAM_1":
                    subGoalFromTeam(1);
                    break
                case "SUB_GOAL_TEAM_2":
                    subGoalFromTeam(2);
                    break
                case "ADD_FAUL_TEAM_1":
                    addFaulToTeam(1);
                    break
                case "SUB_FAUL_TEAM_1":
                    subFaulFromTeam(1);
                    break
                case "ADD_FAUL_TEAM_2":
                    addFaulToTeam(2);
                    break
                case "SUB_FAUL_TEAM_2":
                    subFaulFromTeam(2);
                    break
                case "SET_TIMEOUT_TIMER":
                    setTimeoutToTimer();
                    break
                case "SET_BREAK_TIMER":
                    setBreakToTimer();
                    break;
                case "SET_PERIOD":
                    setTimer(payload);
                    break;
                default:
                    console.warn("Непозната команда:", type);
            }
        }

        const controlWindows =window.open(`/controls/${id}`,"ControlPanel")

        return () => {
            channel.close();
        }
    },[])

    if(!matchData){
        return <div>Loading...</div>;
    }

    const {
        match,
        timer,
        goalsTeam1,
        goalsTeam2,
        faulsTeam1,
        faulsTeam2,
        halfTimeCounter
    } = matchData;





    const formatTime = ()=>{
        const minutes=Math.floor(remainingTime / 60);
        const seconds=remainingTime % 60;
        return {
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0")
        }
    }

    const {minutes,seconds}=formatTime()
    return (

        <div className="scoreboard">
            <h1 className="tournament-title">Меморијален турнир- Андреј Митев</h1>

            <div className="center-section">
                <div className="team">
                    <h2>{match.team1.name}</h2>

                    <div className="score">{goalsTeam1}</div>
                </div>

                <div className="main-timer">
                    <span className="minutes">{minutes}</span>
                    <span className="colon">:</span>
                    <span className="seconds">{seconds}</span>
                </div>
                <div className="team">
                    <h2>{match.team2.name}</h2>
                    <div className="score">{goalsTeam2}</div>
                </div>

            </div>
            <div className="bottom-info">
                <div className="fauls">Фаули: <br/> <span>{faulsTeam1}</span></div>
                <div className="period">ПЕРИОД: <br/> {halfTimeCounter}</div>
                <div className="fauls">Фаули: <br/> <span>{faulsTeam2}</span></div>
            </div>
            <button className="controls-button">Контроли</button>
        </div>
    );
};

export default StopWatch;