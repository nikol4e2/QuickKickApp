import React, {use, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Service from "../../repository/repository";

const StartSettings = () => {

    const navigate = useNavigate();

    const params = useParams();
    const id=params.id;

    const [request, setRequest] = React.useState({ matchId: id, minutesForHalfTime: 20, pauseTime : 5, timeoutTime : 1});




    const handleSubmit= (e)=>{
        e.preventDefault();
        Service.createPlayingMatch(request).then(result=>{
            navigate(`/stopwatch/`+result.data.id);
        }).catch(err=>{
            console.log("Грешка при креирање на натпреварот:",err);
        })
    }

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setRequest({...request, [name]: value});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Внеси минути за едно полувреме:</label>
                    <input type="number" name="minutesForHalfTime" value={request.minutesForHalfTime} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="">Внеси време за пауза меѓу полувремиња:</label>
                    <input type="number" name="pauseTime" value={request.pauseTime} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="">Внеси време за тајмоут(тимски);</label>
                    <input type="number" name="timeoutTime" value={request.timeoutTime} onChange={handleChange}/>
                </div>
                <button type="submit">Започни</button>

            </form>
        </div>
    );
};

export default StartSettings;