import React, {useEffect} from 'react';
import Service from "../../repository/repository";
import "./listAllPlayers.css"
import {Link} from "react-router-dom";
const ListAllPlayers = ({teamId}) => {

    const [players, setPlayers] = React.useState([]);

    useEffect(() => {
        if(teamId!=null){
            loadPlayersByTeam(teamId);
        }else{loadPlayers();}

    }, []);

    const loadPlayers = () => {
        Service.fetchAllPlayers().then((response) => {setPlayers(response.data);}).catch((error) => {console.log(error)});
    }

    const loadPlayersByTeam = (teamId) => {
        Service.fetchAllPlayersByTeam(teamId).then((response) => {setPlayers(response.data);}).catch((error) => {console.log(error)});
    }

    const handleSubmit = (e,playerId) => {
        e.preventDefault();
        const confirmed=window.confirm('Дали сте сигурурни дека сакате да го избришите играчот?');
        if(!confirmed){
            return;
        }
        Service.deletePlayer(playerId).then(()=>{setPlayers(prevState => prevState.filter(player => player.id !== playerId));})
            .catch((error) => {console.log(error)});
    }

        

    return (
        <>

            <div className="players-wrapper">
                <h2 className="players-title">Играчи</h2>
                <div className="players-table-containers">
                    <table className="players-table">
                        <thead>
                            <tr>
                                <th>Име на играч</th>
                                <th>Презиме</th>
                                <th>Повеќе</th>
                            </tr>
                        </thead>
                            <tbody>
                            {players.length>0 && players.map(player => (
                                <tr key={player.id}>
                                    <td>{player.firstName}</td>
                                    <td>{player.secondName}</td>
                                    <td><Link to={`/admin/players/${player.id}`}>Измени</Link></td>
                                    <td>
                                        <form onSubmit={(e)=>handleSubmit(e,player.id)}><button>Избрши играч</button></form></td>
                                </tr>
                            ))}
                            </tbody>
                    </table>
                </div>
                {!teamId && <button ><Link className="add-new-player-button-admin" to={`/admin/players/add-player`}>Додадете нов играч!</Link></button>}

            </div>
        </>
    )
};

export default ListAllPlayers;