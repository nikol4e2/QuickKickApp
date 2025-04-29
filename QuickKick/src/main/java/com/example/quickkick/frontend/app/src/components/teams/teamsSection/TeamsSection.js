import React, {useEffect, useState} from 'react';
import Service from '../../../repository/repository.js';
import "./teamsSection.css"
import {Link} from "react-router-dom";
const TeamsSection = () => {

    const [teams, setTeams] = React.useState([]);

    useEffect(() => {
        loadTeams();
    },[])

    const loadTeams = () => {
        Service.fetchTeams().then(data => {setTeams(data.data)}).catch(error => console.log(error));
    }
    return (
        <div className="teams-wrapper">
            <h2 className="teams-title">ТИМОВИ</h2>
            <div className="teams-table-container">
                <table className="teams-table">
                    <thead>
                    <tr>
                        <th>Име</th>
                        <th>Детали</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map(team => (
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td><Link to={`/teams/${team.id}`}>Кликни овде за повеќе детали</Link></td>
                        </tr>
                    ))}
                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default TeamsSection;