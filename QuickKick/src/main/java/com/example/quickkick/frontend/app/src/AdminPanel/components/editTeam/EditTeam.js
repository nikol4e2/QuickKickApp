import React from 'react' ;
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import Service from "../../../repository/repository";
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
            <h2>Edit Team</h2>
            <form onSubmit={handleSubmit} className="edit-team-form">
                <div>
                    <label htmlFor="">Name:</label>
                    <input type="text" name="name" value={team.name} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">TeamGroup:</label>
                    <input type="text" name="teamGroup" value={team.teamGroup} onChange={handleChange}  required/>
                    <span>Insert A, B, C or D</span>
                </div>
                <div>
                    <label htmlFor="">Wins:</label>
                    <input type="number" name="wins" value={team.wins} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Losses:</label>
                    <input type="number" name="losses" value={team.losses} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Draws:</label>
                    <input type="number" name="draws" value={team.draws} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Points:</label>
                    <input type="number" name="points" value={team.points} onChange={handleChange}  required/>
                </div>
                <div>
                    <label htmlFor="">Scored Goals:</label>
                    <input type="number" name="scoredGoals" value={team.scoredGoals} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor="">Taken Goals:</label>
                    <input type="number" name="takenGoals" value={team.takenGoals} onChange={handleChange}></input>
                </div>
                <button type="submit">Save Changes</button>

            </form>

        </div>
    );
};

export default EditTeam;