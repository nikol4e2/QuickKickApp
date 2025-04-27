import React, {use} from 'react';
import {Link, useParams} from "react-router-dom";
import ListAllPlayers from "../ListAllPlayers";
import "./listPlayersByTeam.css"
const ListPlayersByTeam = () => {

    const params=useParams();
    const id=params.id;
    return (
        <div className="container">
            <h1>Играчи во тимот:</h1>
            <ListAllPlayers teamId={id}></ListAllPlayers>

            <div className="add-player-button">
                <Link to={`/admin/teams/${id}/add-player`}>Додади играч</Link>
            </div>

        </div>

    );
};

export default ListPlayersByTeam;