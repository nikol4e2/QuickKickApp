import React, {useEffect} from 'react';
import Service from "../../../repository/repository";
import "./addGoalAfterMatch.css"
const AddGoalAfterMatch = ({matchId,team1,team2,goalsTeam1,goalsTeam2}) => {

    const [playersTeam1, setPlayersTeam1] = React.useState([]);
    const [playersTeam2, setPlayersTeam2] = React.useState([]);
    const [remainingGoalsTeam1, setRemainingGoalsTeam1] = React.useState(goalsTeam1);
    const [remainingGoalsTeam2, setRemainingGoalsTeam2] = React.useState(goalsTeam2);
    const [newPlayerName1, setNewPlayerName1] = React.useState("");
    const [newPlayerName2, setNewPlayerName2] = React.useState("");

    useEffect(() => {
        Service.fetchAllPlayersByTeam(team1.id)
            .then(response => {
                const initialized = response.data.map(p => ({ ...p, goals: 0 }));
                setPlayersTeam1(initialized);
            })
            .catch(console.error);

        Service.fetchAllPlayersByTeam(team2.id)
            .then(response => {
                const initialized = response.data.map(p => ({ ...p, goals: 0 }));
                setPlayersTeam2(initialized);
            })
            .catch(console.error);
    }, []);


    const handleGoalChange = (playerId, value, team) => {
        const intVal = parseInt(value) || 0;

        if (team === "team1") {
            setPlayersTeam1(prev => {
                return prev.map(player => {
                    if (player.id === playerId) {
                        const diff = intVal - (player.goals || 0);
                        const newRemaining = remainingGoalsTeam1 - diff;
                        if (newRemaining < 0) return player;
                        setRemainingGoalsTeam1(newRemaining);
                        return {...player, goals: intVal};
                    }
                    return player;
                });
            });
        }else if( team === "team2") {
            setPlayersTeam2(prev => {
                return prev.map(player => {
                    if (player.id === playerId) {
                        const diff = intVal - (player.goals || 0);
                        const newRemaining = remainingGoalsTeam2 - diff;
                        if (newRemaining < 0) return player;
                        setRemainingGoalsTeam2(newRemaining);
                        return {...player, goals: intVal};
                    }
                    return player;
                });
            })
        }
    }


    const handleAddPlayer = async (e, team) => {
        e.preventDefault();

        const playerName = team === "team1" ? newPlayerName1 : newPlayerName2;
        const nameParts = playerName.trim().split(" ");
        if (nameParts.length < 2) {
            alert("Внеси име и презиме!");
            return;
        }

        const requestData = {
            firstName: nameParts[0],
            lastName: nameParts[1],
            teamId: team === "team1" ? team1.id : team2.id
        };

        try {
            const response = await Service.addPlayerToTeam(requestData);
            const savedPlayer = {
                ...response.data,
                goals: 0
            };

            if (team === "team1") {
                setPlayersTeam1(prev => [...prev, savedPlayer]);
                setNewPlayerName1("");
            } else {
                setPlayersTeam2(prev => [...prev, savedPlayer]);
                setNewPlayerName2("");
            }

        } catch (error) {
            console.error("Грешка при додавање на играчот:", error);
            alert("Неуспешно додавање на играчот.");
        }
    };



    const handleSubmit = () => {
        const payload = {

            team1: playersTeam1.map(p => ({ id: p.id, goals: p.goals })),
            team2: playersTeam2.map(p => ({ id: p.id, goals: p.goals })),
        };


        Service.submitGoals(payload)
            .then(res =>{ alert("Головите се успешно внесени!"); window.close()})
            .catch(console.error);
    };
    return (
        <div className="add-goal-after-match-container">
            <div className="team1-section-goals">
                <h2>{team1.name}</h2>
                <h3>Преостанати голови: {remainingGoalsTeam1}</h3>

                <div className="goals-players-section">
                    {playersTeam1.map(player => (
                        <div key={player.id}>
                            {player.firstName} {player.secondName}
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="number"
                                    min="0"
                                    value={player.goals}
                                    onChange={(e) =>
                                        handleGoalChange(player.id, e.target.value, "team1")
                                    }
                                />
                            </form>
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Име Презиме"
                    value={newPlayerName1}
                    onChange={(e) => setNewPlayerName1(e.target.value)}
                />
                <button onClick={(e)=>handleAddPlayer(e,"team1")}>Додади играч</button>
            </div>
            <div className="team2-section-goals">
            <h2>{team2.name}</h2>
            <h3>Преостанати голови: {remainingGoalsTeam2}</h3>

            <div className="goals-players-section">
                {playersTeam2.map(player => (
                    <div key={player.id}>
                        {player.firstName} {player.secondName}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="number"
                                min="0"
                                value={player.goals}
                                onChange={(e) =>
                                    handleGoalChange(player.id, e.target.value, "team2")
                                }
                            />
                        </form>
                    </div>
                ))}
            </div>

            <input
                type="text"
                placeholder="Име Презиме"
                value={newPlayerName2}
                onChange={(e) => setNewPlayerName2(e.target.value)}
            />
            <button onClick={(e) => handleAddPlayer(e, "team2")}>Додади играч</button>
        </div>

            <button onClick={handleSubmit}>Заврши натпревар</button>
        </div>
    );
};

export default AddGoalAfterMatch;