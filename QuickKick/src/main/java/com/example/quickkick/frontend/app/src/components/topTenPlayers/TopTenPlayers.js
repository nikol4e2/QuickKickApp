import React, {useEffect} from 'react';
import Service from "../../repository/repository";
import "./topTenPlayers.css"
const TopTenPlayers = () => {

    const [topPlayers, setTopPlayers] = React.useState([]);

    useEffect(() => {
        loadPlayers();
    },[])

    const loadPlayers = () => {
        Service.fetchTopTenPlayers().then(response => {setTopPlayers(response.data)}).catch(e => console.log(e));
    }

    return (
        <div className="top-players-container">
            {topPlayers.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Име</th>
                        <th>Презиме</th>
                        <th>Тим</th>
                        <th>Постигнати голови</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topPlayers.map((player) => (
                        <tr key={player.id}>
                            <td>{player.firstName}</td>
                            <td>{player.secondName}</td>
                            <td>{player.team.name}</td>
                            <td>{player.goals}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div>Нема внесено играчи</div>
            )}
        </div>

    );
};

export default TopTenPlayers;