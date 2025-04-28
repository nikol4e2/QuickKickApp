import React, {useEffect} from 'react';
import Service from "../../repository/repository";
import {Link} from "react-router-dom";
import "./schedule.css"
const Schedule = () => {

    const [matches, setMatches] = React.useState([]);

    const [filter, setFilter] = React.useState("ALL");


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
        const formattedTime = dateObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        return {formattedDate, formattedTime};
    }

     const translateStatus= (status) => {
        switch (status) {
            case "SCHEDULED":
                return "Закажан";
            case "PLAYING":
                return "Во тек";
            case "FINISHED":
                return "Завршен";
            default:
                return "Непознат";
        }
     }





    return (
        <div className="matches-container">
            <div style={{marginBottom: '20px'}}>
                <button onClick={()=>setFilter("ALL")}>Сите</button>
                <button onClick={()=>setFilter("SCHEDULED")}>Закажани</button>
                <button onClick={()=>setFilter("PLAYING")}>Во тек</button>
                <button onClick={()=>setFilter("FINISHED")}>Завршени</button>
            </div>
            <div>
                {filteredMatches.length > 0 ?
                    filteredMatches.map((match) => {
                        const { formattedDate, formattedTime } = formatDate(match.date);

                        return (
                            <div key={match.id} className="match-card">
                                <h3>{match.team1.name} - {match.team2.name}</h3>
                                <p>Статус: {translateStatus(match.status)}</p>
                                <p>Датум: {formattedDate}</p>
                                <p>Време: {formattedTime}</p>

                                {match.status === "FINISHED" &&(
                                    <p className="result">Резултат: {match.goalsTeam1} - {match.goalsTeam2}</p>
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