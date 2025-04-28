import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import {useNavigate, useParams} from "react-router-dom";

const EditMatch = () => {


    const params = useParams();
    const id = params.id;


    const [match, setMatch] = React.useState(null);
    const [teams, setTeams] = React.useState([]);

    const navigate = useNavigate();




    useEffect(() => {
        loadMatch();
        loadTeams();
    },[])

    const loadMatch = () => {
        Service.fetchMatch(id).then(response => {setMatch(response.data);}).catch(error => console.log(error));
    }

    const loadTeams = () => {
        Service.fetchTeams(id).then(response => {setTeams(response.data);}).catch(error => console.log(error));
    }



        const handleChange = (e) => {
            const { name, value } = e.target;
            setMatch(prevMatch=>({...prevMatch, [name]: value}));
        }


    const handleSubmit = (e) => {
        e.preventDefault();
        const team1Id=parseInt(match.team1);
        const team2Id=parseInt(match.team2);
        const matchData={date: match.date, team1: team1Id, team2: team2Id};
        Service.editMatch(id,matchData).then(()=>{navigate("/admin/matches")}).catch(error => console.log(error));
    }





    return (
        <div>
            {match!== null && <form onSubmit={handleSubmit} >
                <div>
                    <div>
                        <label htmlFor="">Избери дата и време</label>

                        <input type="datetime-local" name="date" onChange={handleChange} value={match.date} required/>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Избери тим1</label>
                    <span>Претходен избор:{match.team1.name}</span>
                    <select name="team1" onChange={handleChange}  >
                        <option>Изберете тим1</option>
                        {teams.length>0 && teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>


                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Избери тим2</label>
                    <span>Претходен избор:{match.team2.name}</span>
                    <select name="team2" onChange={handleChange}  >
                        <option>Изберете тим2</option>
                        {teams.length>0 && teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>


                        ))}
                    </select>
                </div>
                <button type="submit">ИЗМЕНИ</button>
            </form>
            }
        </div>
    );
};

export default EditMatch;