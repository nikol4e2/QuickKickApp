import React from 'react' ;
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import Service from "../../../repository/repository";
import "./editTeam.css"
const EditTeam = () => {

    const navigate = useNavigate();

    const [team, setTeam] = useState(   {name: '',
        teamGroup: '',
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
        scoredGoals: 0,
        takenGoals: 0});


    const teamId = useParams();

    useEffect(() => {
        fetchTeam(teamId.id)
    },[teamId])

    const fetchTeam = (id) => {
        Service.fetchTeam(id).then(team => {setTeam(team.data)})
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setTeam(prevState => ({
        ...prevState,[name]: value}));

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        Service.updateTeam(teamId.id,team).then(()=> navigate("/admin/teams"))
    }


    return (
        <div className="edit-team-container">
            <h2>Измени Тим</h2>
            <form onSubmit={handleSubmit} className="edit-team-form">
                <div>
                    <label htmlFor="">Име:</label>
                    <input type="text" name="name" value={team.name} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Група:</label>
                    <input type="text" name="teamGroup" value={team.teamGroup} onChange={handleChange}  required/>
                    <span>Insert A, B, C or D</span>
                </div>
                <div>
                    <label htmlFor="">Број на победи:</label>
                    <input type="number" name="wins" value={team.wins} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Број на загуби:</label>
                    <input type="number" name="losses" value={team.losses} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Нерешени:</label>
                    <input type="number" name="draws" value={team.draws} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Поени:</label>
                    <input type="number" name="points" value={team.points} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Постигнати голови:</label>
                    <input type="number" name="scoredGoals" value={team.scoredGoals} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor="">Примани голови:</label>
                    <input type="number" name="takenGoals" value={team.takenGoals} onChange={handleChange}></input>

                </div>

                <button type="submit">Зачувај</button>




            </form>
           <Link className="players-button" to={`/admin/teams/${teamId.id}/players`}>Оди кон играчите во тимот</Link>

        </div>
    );
};

export default EditTeam;