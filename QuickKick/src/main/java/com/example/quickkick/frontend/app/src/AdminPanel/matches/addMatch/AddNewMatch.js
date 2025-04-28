import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import {useNavigate} from "react-router-dom";

const AddNewMatch = () => {
    const [match, setMatch] = React.useState({
        date: '',
        team1: '',
        team2: '',
        goalsTeam1: 0,
        goalsTeam2: 0,
        status: 'SCHEDULED'
    });


    const navigate = useNavigate();



    const [teams, setTeams] = React.useState([]);

    useEffect(() => {
        loadTeams();
    },[])


    const loadTeams = () => {
        Service.fetchTeams().then(response => {setTeams(response.data);}).catch(error => {console.log(error)});
        console.log(teams)
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatch(prevMatch=>({...prevMatch, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(match.team1==="" || match.team===""){
            window.alert("ВНЕСЕТЕ ТИМОВИ!");
            return;
        }
        if(parseInt(match.team1) === parseInt(match.team2)){
            window.alert("ИМАТЕ ИЗБЕРЕНО ДВА ИСТИ ТИМА ЗА ПРОТИВНИЦИ");
            return;
        }



        Service.addMatch(match)
            .then(()=>{navigate("/admin/matches")}).catch(error => {console.log(error)});
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Избери дата и време</label>
                    <input type="datetime-local" name="date" onChange={handleChange} value={match.date} required/>
                </div>
                <div>
                    <label htmlFor="">Изберете ТИМ1</label>
                    <select onChange={handleChange} required name="team1" >
                        <option >Изберете тим1</option>
                        {teams.length>0 && teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>


                        ))}
                    </select>

                </div>
                <div>
                    <label htmlFor="">Изберете ТИМ2</label>
                    <select onChange={handleChange} required name="team2" >
                        <option >Изберете тим2</option>
                        {teams.length>0 && teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>


                        ))}
                    </select>
                </div>

                <button type="submit">ДОДАДИ НАТПРЕВАР</button>
            </form>
        </div>
    );
};

export default AddNewMatch;