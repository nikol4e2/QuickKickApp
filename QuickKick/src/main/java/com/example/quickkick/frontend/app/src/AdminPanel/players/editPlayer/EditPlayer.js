import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Service from "../../../repository/repository";

const EditPlayer = () => {
    const params = useParams();
    const playerId=params.id;

    const navigate = useNavigate();

    const [player, setPlayer] = React.useState(null);

    useEffect(() => {
        loadPlayer();
    },[])

    const loadPlayer= ()=>{
        Service.fetchPlayer(playerId).then((response)=>{setPlayer(response.data)}).catch((err)=>{console.log(err)});
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setPlayer(prevState=>({...prevState,[name]:value}));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        Service.updatePlayer(playerId,player).then(() => navigate("/admin/players"));
    }



    return (
        <div className="edit-player-container">
            <h2>Измени играч</h2>
            {player!==null?
            <form className="edit-player-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Име:</label>
                    <input type="text" value={player.firstName} onChange={handleChange} name="firstName"/>
                </div>
                <div>
                    <label htmlFor="">Презиме</label>
                    <input type="text" value={player.secondName} onChange={handleChange} name="secondName"/>
                </div>
                <div>
                    <label htmlFor="">Постигнати голови</label>
                    <input type="number" value={player.goals} onChange={handleChange} name="goals"/>
                </div>
                <button type="submit">Зачувај</button>
            </form>
            : <div>Играчот не е пронајден</div>

            }
        </div>
    );
};

export default EditPlayer;