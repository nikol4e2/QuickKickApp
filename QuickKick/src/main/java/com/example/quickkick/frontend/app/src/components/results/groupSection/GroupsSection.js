import React, { useEffect, useState } from 'react';
import Service from "../../../repository/repository.js";
import "./groupsSection.css";
import EliminationSimulation from "../../eliminationSimulation/EliminationSimulation";


const GroupsSection = () => {
    const [groupATeams, setGroupATeams] = useState([]);
    const [groupBTeams, setGroupBTeams] = useState([]);
    const [groupCTeams, setGroupCTeams] = useState([]);
    const [groupDTeams, setGroupDTeams] = useState([]);
    const [groupETeams, setGroupETeams] = useState([]);
    const [groupFTeams, setGroupFTeams] = useState([]);

    const [showSimulation, setShowSimulation] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);

    useEffect(() => {
        loadTeamsByGroup();
    }, []);

    const loadTeamsByGroup = () => {
        Service.fetchTeamsByGroup("a").then(response => setGroupATeams(response.data));
        Service.fetchTeamsByGroup("b").then(response => setGroupBTeams(response.data));
        Service.fetchTeamsByGroup("c").then(response => setGroupCTeams(response.data));
        Service.fetchTeamsByGroup("d").then(response => setGroupDTeams(response.data));
        Service.fetchTeamsByGroup("e").then(response => setGroupETeams(response.data));
        Service.fetchTeamsByGroup("f").then(response => setGroupFTeams(response.data));
    };

    const handleToggleSimulation = () => {
        setShowSimulation(prev => !prev);
    };

    const handleSelectGroup = (groupName) => {
        setSelectedGroups(prev => {

            if (prev.includes(groupName)) {
                return prev.filter(g => g !== groupName);
            }

            else if (prev.length < 4) {
                return [...prev, groupName];
            }

            else {
                return prev;
            }
        });
    };;

    const renderGroupTable = (title, teams) => (
        <div className="group-table-wrapper">
            <h3 className="group-title">{title}</h3>
            <table className="group-table">
                <thead>
                <tr className="table-head">
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
                            if (b.points !== a.points) return b.points - a.points;
                            const diffA = a.scoredGoals - a.takenGoals;
                            const diffB = b.scoredGoals - b.takenGoals;
                            return diffB - diffA;
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
    );

    return (
        <div className="groups-section-container">
            <button className="simulate-btn" onClick={handleToggleSimulation}>
                {showSimulation ? "Затвори" : "Симулирај осминафинале"}
            </button>

            {showSimulation && (
                <div className="simulation-selection">
                    <h3>Избери 4 групи од кои ќе продолжат третопласирани:</h3>
                    <div className="checkbox-wrapper">
                        {["A", "B", "C", "D", "E", "F"].map(g => (
                            <label key={g} className="group-label">
                                <input
                                    type="checkbox"
                                    checked={selectedGroups.includes(g)}
                                    onChange={() => handleSelectGroup(g)}
                                    disabled={!selectedGroups.includes(g) && selectedGroups.length >= 4}
                                />
                                Група {g}
                            </label>
                        ))}
                    </div>

                    {selectedGroups.length === 4 && (
                        <EliminationSimulation
                            groupATeams={groupATeams}
                            groupBTeams={groupBTeams}
                            groupCTeams={groupCTeams}
                            groupDTeams={groupDTeams}
                            groupETeams={groupETeams}
                            groupFTeams={groupFTeams}
                            selectedGroups={selectedGroups}
                        />
                    )}
                </div>
            )}

            <h2 className="section-title">Групи</h2>
            {renderGroupTable("Група А", groupATeams)}
            {renderGroupTable("Група B", groupBTeams)}
            {renderGroupTable("Група C", groupCTeams)}
            {renderGroupTable("Група D", groupDTeams)}
            {renderGroupTable("Група E", groupETeams)}
            {renderGroupTable("Група F", groupFTeams)}
        </div>
    );
};

export default GroupsSection;
