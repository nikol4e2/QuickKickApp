import React, {useEffect} from 'react';
import Service from "../../repository/repository";

import "./schedule.css"
const Schedule = () => {

    const [matches, setMatches] = React.useState([]);

    const [filter, setFilter] = React.useState("SCHEDULED");


    const filteredMatches= matches.filter((match) => {
        if(filter === "ALL"){ return true}
        return match.status === filter;
    })


    useEffect(() => {
        loadMatches();
    },[])


    const loadMatches = () => {
        Service.fetchAllMatches().then(response => {
            const sortedMatches = response.data.sort((a,b) => new Date(a.date)-new Date(b.date));
            setMatches(sortedMatches);})
            .catch(error => {console.log(error)});
    }

    const formatDate= (dateString) =>{
        const dateObj = new Date(dateString);
        const formattedDate = dateObj.toLocaleDateString('mk-MK',{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        const formattedTime = dateObj.toLocaleTimeString('mk-MK', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        return {formattedDate, formattedTime};
    }

     const translateStatus= (status) => {
        switch (status) {
            case "SCHEDULED":
                return "Закажан";

            case "FINISHED":
                return "Завршен";
            default:
                return "Се игра";
        }
     }





    return (
        <div className="matches-container-schedule">
            <div style={{marginBottom: '20px'}}>
                <button onClick={()=>setFilter("SCHEDULED")}>Следни</button>
                <button onClick={()=>setFilter("FINISHED")}>Завршени</button>
                <button onClick={()=>setFilter("ALL")}>Сите</button>



            </div>
            <div>
                {filteredMatches.length > 0 ?
                    filteredMatches.map((match) => {
                        const { formattedDate, formattedTime } = formatDate(match.date);

                        return (
                            <div key={match.id} className="match-card-schedule">
                                <h3>{match.team1.name} - {match.team2.name}</h3>
                                <p>Статус: {translateStatus(match.status)}</p>
                                <p>Датум: {formattedDate}</p>
                                <p>Време: {formattedTime}</p>

                                {match.status === "FINISHED" &&(
                                    <p>Резултат:<span className="result-schedule"> {match.goalsTeam1} - {match.goalsTeam2}</span></p>
                                )}



                            </div>

                        );

                    }): (
                        <p className="no-matches-message">Нема натрепвари за прикажување</p>
                    )}
            </div>




        </div>
    );
};

export default Schedule;