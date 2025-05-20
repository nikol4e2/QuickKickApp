import React, {useEffect, useRef} from 'react';
import Service from "../../../repository/repository";
import {useParams} from "react-router-dom";
import "./Stopwatch.css";
//import timerSound from "../../../../public/sounds/10-sec-timer.mp3"
const StopWatch = () => {

    const params= useParams();
    const id = params.id;



    const [remainingTime, setRemainingTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [isMatchStarted, setIsMatchStarted] = React.useState(false);



    const [timeoutActive, setTimeoutActive] = React.useState(false);
    const [timeoutRemaining, setTimeoutRemaining] = React.useState(60);


    const [halfTimeRestActive, setHalfTimeRestActive] = React.useState(false);
    const [halfTimeRestRemaining, setHalfTimeRestRemaining] = React.useState(0);
    const [halfCounter,setHalfCounter] = React.useState(1);


    const [matchData, setMatchData] = React.useState(null);
    const [isFlashing, setIsFlashing] = React.useState(false);
    const playSound = (sound) =>{
        const audio = new Audio(sound);
        audio.play().catch((err) => {console.log("Audio error:",err)});
    }

    const triggerFlash = () => {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 1500);
    }

    useEffect(() => {
        Service.fetchPlayingMatch(id).then(result=>{
            setMatchData(result.data)
            setHalfCounter(result.data.halfTimeCounter)
            const totalTime=result.data.minutesForHalfTime*60;
            if(result.data.status==="WAITING_TO_START")
            {
                setIsMatchStarted(false);
            }else

            setRemainingTime(totalTime);
         

            setTimeoutRemaining(result.data.timeoutTime*60);
            setHalfTimeRestRemaining(result.data.pauseTime*60);
            setHalfTimeRestRemaining(10);
        }).catch(err=>{console.log("Error loading match: ",err)})
    }, []);


    const buzzerSound = useRef(null);

    useEffect(() => {

        buzzerSound.current = new Audio(process.env.PUBLIC_URL + '/sounds/buzzer-1.mp3');
    }, []);


    //MAIN TIMER
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
                        if (buzzerSound.current) {
                            buzzerSound.current.currentTime = 0;
                            buzzerSound.current.play().catch(err => console.log("Error playing buzzer:", err));
                        }

                        if(halfCounter===1)
                        {
                            setHalfTimeRestActive(true);
                            setHalfCounter(2);
                            stopTimer();
                            Service.signalHalfTime(id).catch(err => console.log("Error notifying backend:", err));
                        }
                        if(halfCounter===2)
                        {

                        }
                        clearInterval(interval);
                        return 0;
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, remainingTime, halfCounter]);


    //TIMEOUT REST TIMER
    useEffect(() => {
        let timeoutInterval=null;

        if(timeoutActive && timeoutRemaining>0){
            Service.signalTimeout(id).catch(err=>console.log("Error notifying backend:", err));
            timeoutInterval=setInterval(()=>{
                setTimeoutRemaining(prev=> prev-1)
            },1000);
        }else if (timeoutActive && timeoutRemaining===0){
            setTimeoutActive(false);

        }

        return () => clearInterval(timeoutInterval)
    },[timeoutActive,timeoutRemaining]);




    //HALF TIME REST TIMER

    useEffect(() => {
        let restInterval=null;

        if (halfTimeRestActive) {
            if (halfTimeRestRemaining > 0) {
                restInterval = setInterval(() => {
                    setHalfTimeRestRemaining(prev => prev - 1);
                }, 1000);
            } else {

                setHalfTimeRestActive(false);
                //setRemainingTime(matchData.minutesForHalfTime * 60);
                setRemainingTime(30)
                stopTimer();
                Service.signalPlayingAgain(id).catch(err => console.log("Error notifying backend:", err));
            }
        }

        return () => clearInterval(restInterval);
    }, [halfTimeRestActive,halfTimeRestRemaining])




    //MESSAGES

    const startTimer = () =>{
        if(isMatchStarted===false)
        {

            Service.signalStartOfMatch(id).catch(err=>{console.log( err)})
        }
        setIsRunning(true);



    }
    const stopTimer = () =>{
        setIsRunning(false);

    }
    const addGoalToTeam = (teamNumber) => {
        playSound(process.env.PUBLIC_URL + '/sounds/se_goalring.mp3');
        triggerFlash()
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

        stopTimer();
        setTimeoutActive(true)

    }

    const setBreakToTimer= () =>{
        stopTimer();

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



    const {minutes,seconds}=formatTime();

    const formatTimeString=(time) =>{

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes}:${seconds}`;

    }

    const  openControls= ()=>{
        window.open(`/controls/${id}`,"ControlPanel");
    }


    return (

        <div className={`scoreboard ${isFlashing ? "flash-background" : ""}`}>
            <h1 className="tournament-title">Меморијален турнир- Андреј Митев</h1>

            <div className="center-section">
                <div className="team">
                    <h2>{match.team1.name}</h2>

                    <div className="score-stopwatch">{goalsTeam1}</div>
                </div>

                <div className="main-timer">
                    <span className="minutes">{minutes}</span>
                    <span className="colon">:</span>
                    <span className="seconds">{seconds}</span>
                    {timeoutActive && (
                        <div className="timeout-box">
                            ⏱ Тајм-аут: {timeoutRemaining}

                        </div>)}
                    {halfTimeRestActive && (
                        <div className="timeout-box">
                            ⏱ ПАУЗА: {formatTimeString(halfTimeRestRemaining)}
                        </div>
                    )}
                </div>



                <div className="team">
                    <h2>{match.team2.name}</h2>
                    <div className="score-stopwatch">{goalsTeam2}</div>
                </div>

            </div>
            <div className="bottom-info">
                <div className="fauls">Фаули: <br/> <span>{faulsTeam1}</span></div>
                <div className="period">ПЕРИОД: <br/> {halfCounter}</div>
                <div className="fauls">Фаули: <br/> <span>{faulsTeam2}</span></div>
            </div>
            <button className="controls-button" onClick={openControls}>Контроли</button>
        </div>
    );
};

export default StopWatch;