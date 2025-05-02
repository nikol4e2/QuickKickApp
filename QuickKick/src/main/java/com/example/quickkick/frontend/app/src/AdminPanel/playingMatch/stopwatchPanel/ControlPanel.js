import React, {use, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Service from "../../../repository/repository";

const ControlPanel = () => {

    const params=useParams();
    const id=params.id;


    const [matchData, setMatchData] = React.useState(null);
    const [remainingTime, setRemainingTime] = React.useState(0);

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


    return (
        <div>
            <div>
                <h3>ТИМ1</h3>
                    <div>
                        <button onClick={() => sendCommand("ADD_GOAL_TEAM_1")}>Додади гол на Тим 1</button>
                        <button onClick={() => sendCommand("SUB_GOAL_TEAM_1")}>Одземи гол на Тим 1</button>
                    </div>

                    <div>
                        <button onClick={() => sendCommand("ADD_FAUL_TEAM_1")}>Додади Фаул на Тим 1</button>
                        <button onClick={() => sendCommand("SUB_FAUL_TEAM_1")}>Одземи Фаул на Тим 1</button>
                    </div>

            </div>

            <div>
                <h3>ТИМ2</h3>
                    <button onClick={() => sendCommand("ADD_GOAL_TEAM_2")}>Додади гол на Тим 2</button>
                    <button onClick={() => sendCommand("SUB_GOAL_TEAM_2")}>Одземи гол на Тим 2</button>
                    <button onClick={() => sendCommand("ADD_FAUL_TEAM_2")}>Додади Фаул на Тим 2</button>
                    <button onClick={() => sendCommand("SUB_FAUL_TEAM_2")}>Одземи Фаул на Тим 2</button>
            </div>


            <div>
                <h3>КОНТРОЛИ ТАЈМЕР</h3>
                    <button onClick={() => sendCommand("START_TIMER")}>Старт</button>
                    <button onClick={() => sendCommand("PAUSE_TIMER")}>Пауза</button>
                    <button onClick={() => sendCommand("SET_TIMEOUT_TIMER", 30)}>Тајмаут (30s)</button>
                    <button onClick={() => sendCommand("SET_BREAK_TIMER", 120)}>Пауза полувреме (2min)</button>
                    <button onClick={() => sendCommand("SET_PERIOD", 2)}>Второ полувреме</button>
            </div>
        </div>
    );
};

export default ControlPanel;