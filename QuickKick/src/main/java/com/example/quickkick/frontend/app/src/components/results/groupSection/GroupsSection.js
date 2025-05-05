import React from 'react';
import {useEffect, useState} from 'react'
import Service from "../../../repository/repository.js";
import "./groupsSection.css"



const GroupsSection = () => {

    const [groupATeams, setGroupATeams] = useState([]);
    const [groupBTeams, setGroupBTeams] = useState([]);
    const [groupCTeams, setGroupCTeams] = useState([]);
    const [groupDTeams, setGroupDTeams] = useState([]);

   useEffect(() => {
       loadTeamsByGroup();

   },[])


    const loadTeamsByGroup =()=>{
        Service.fetchTeamsByGroup("a").then((response) => {setGroupATeams(response.data)});
        Service.fetchTeamsByGroup("b").then((response) => {setGroupBTeams(response.data)});
        Service.fetchTeamsByGroup("c").then((response) => {setGroupCTeams(response.data)});
        Service.fetchTeamsByGroup("d").then((response) => {setGroupDTeams(response.data)});

    }


    const renderGroupTable = (title, teams) =>(

            <div className="group-table-wrapper">
                <h3 className="group-title">{title}</h3>
                <table className="group-table">
                    <thead>
                        <tr className="table=head">
                            <th>Екипа</th>
                            <th>Одиграни</th>
                            <th>Победи</th>
                            <th>Нерешени</th>
                            <th>Дадени голови</th>
                            <th>Примени голови</th>
                            <th>Гол разлика</th>
                            <th>Бодови</th>
                        </tr>
                    </thead>
                    <tbody>
                    {teams.length > 0 ? (
                        teams
                            .slice()
                            .sort((a, b) => {
                                //Sortirame najprvo po poeni,a dokolku se isti potoa po gol razlika
                                if (b.points !== a.points) {
                                    return b.points - a.points;
                                } else {
                                    const goalDiffA = a.scoredGoals - a.takenGoals;
                                    const goalDiffB = b.scoredGoals - b.takenGoals;
                                    return goalDiffB - goalDiffA;
                                }
                            })
                            .map(team => (
                                <tr key={team.id}>
                                    <td>{team.name}</td>
                                    <td>{team.wins + team.draws + team.losses}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.draws}</td>
                                    <td>{team.scoredGoals}</td>
                                    <td>{team.takenGoals}</td>
                                    <td>{team.scoredGoals - team.takenGoals}</td>
                                    <td>{team.points}</td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="8">Нема внесени тимови</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

    )

    return (
        <div className="groups-section">
            <h2 className="section-title">Групи</h2>
            {renderGroupTable("Група А",groupATeams)}
            {renderGroupTable("Група Б",groupBTeams)}
            {renderGroupTable("Група В",groupCTeams)}
            {renderGroupTable("Група Г",groupDTeams)}


        </div>
    );
};

export default GroupsSection;