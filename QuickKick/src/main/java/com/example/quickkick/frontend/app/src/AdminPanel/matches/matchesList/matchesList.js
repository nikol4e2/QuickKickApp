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
                filteredMatches.map((match) => (
                    <div key={match.id}>
                        <h3>{match.team1.name} vs {match.team2.name}</h3>
                        <p>Статус: {match.status}</p>
                    </div>
                )): (
                        <p>Нема натрепвари за прикажување</p>
                        )}
            </div>


            <div className="add-match-button">
                <Link to={"/matches/add-match"}>Додади нов натпревар</Link>
            </div>
        </div>
    );
};

export default MatchesList;