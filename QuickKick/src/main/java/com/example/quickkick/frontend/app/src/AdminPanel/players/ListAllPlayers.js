import React, {useEffect} from 'react';
import Service from "../../repository/repository";
import "./listAllPlayers.css"
import {Link} from "react-router-dom";
const ListAllPlayers = () => {

    const [players, setPlayers] = React.useState([]);

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = () => {
        Service.fetchAllPlayers().then((response) => {setPlayers(response.data);}).catch((error) => {console.log(error)});
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
                                </tr>
                            ))}
                            </tbody>
                    </table>
                </div>


            </div>
        </>
    )
};

export default ListAllPlayers;