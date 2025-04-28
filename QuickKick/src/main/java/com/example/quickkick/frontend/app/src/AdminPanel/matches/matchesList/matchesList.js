import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import {Link} from "react-router-dom";

const MatchesList = () => {

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
        Service.fetchAllMatches().then(response => {setMatches(response.data);}).catch(error => {console.log(error)});
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
                            <div key={match.id}>
                                <h3>{match.team1.name} vs {match.team2.name}</h3>
                                <p>Статус: {match.status}</p>
                                <p>Датум: {formattedDate}</p>
                                <p>Време: {formattedTime}</p>


                                <div className={"edit-match-button"}>
                                    <Link to={`/admin/matches/${match.id}`}><button>Измени</button></Link>
                                </div>
                            </div>

                        );

                    }): (
                        <p>Нема натрепвари за прикажување</p>
                        )}
            </div>


            <div className="add-match-button">
                <Link to={"/admin/matches/add-match"}>Додади нов натпревар</Link>
            </div>

        </div>
    );
};

export default MatchesList;