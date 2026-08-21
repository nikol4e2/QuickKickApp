import React, {useEffect} from 'react';
import Service from "../../repository/repository";
import "./listAllPlayers.css";
import {Link} from "react-router-dom";

const ListAllPlayers = ({teamId}) => {

    const [players, setPlayers] = React.useState([]);

    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const pageSize = 10;

    useEffect(() => {
        loadPlayers();
    }, [currentPage, teamId]);

    const loadPlayers = () => {
        Service.fetchPlayersPaged(currentPage, pageSize, teamId)
            .then((response) => {
                setPlayers(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (e, playerId) => {
        e.preventDefault();

        const confirmed = window.confirm(
            'Дали сте сигурни дека сакате да го избришите играчот?'
        );

        if (!confirmed) {
            return;
        }

        Service.deletePlayer(playerId)
            .then(() => {
                loadPlayers();
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                            <th>Акции</th>
                        </tr>
                        </thead>

                        <tbody>

                        {players.length > 0 ? (

                            players.map(player => (
                                <tr key={player.id}>

                                    <td>{player.firstName}</td>

                                    <td>{player.secondName}</td>

                                    <td>
                                        <Link to={`/admin/players/${player.id}`}>
                                            Измени
                                        </Link>
                                    </td>

                                    <td>
                                        <form
                                            onSubmit={(e) =>
                                                handleSubmit(e, player.id)
                                            }
                                        >
                                            <button type="submit">
                                                Избриши играч
                                            </button>
                                        </form>
                                    </td>

                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan="4">
                                    Нема играчи за прикажување
                                </td>
                            </tr>
                        )}

                        </tbody>

                    </table>

                </div>

                {/* PAGINATION */}

                {totalPages > 1 && (
                    <div className="pagination">

                        <button
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            ←
                        </button>

                        {Array.from(
                            {length: totalPages},
                            (_, index) => (
                                <button
                                    key={index}
                                    className={
                                        currentPage === index
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => setCurrentPage(index)}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}

                        <button
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            →
                        </button>

                    </div>
                )}

                {totalElements > 0 && (
                    <div className="pagination-info">
                        Прикажани{" "}
                        {currentPage * pageSize + 1}
                        {"–"}
                        {Math.min(
                            (currentPage + 1) * pageSize,
                            totalElements
                        )}
                        {" "}од {totalElements} играчи
                    </div>
                )}

                {!teamId && (
                    <button>
                        <Link
                            className="add-new-player-button-admin"
                            to="/admin/players/add-player"
                        >
                            Додадете нов играч!
                        </Link>
                    </button>
                )}

            </div>

        </>
    );
};

export default ListAllPlayers;