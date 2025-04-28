import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Service from "../../../repository/repository";
import {useNavigate} from "react-router-dom";

const AddPlayer = () => {
    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    const [player, setPlayer] = React.useState({firstName:"",
        lastName:"",
        teamId:0});


    const [teams, setTeams] = React.useState([]);

    useEffect(() => {
        loadTeams();
    },[])

    const loadTeams = () => {
        Service.fetchTeams().then(data => {setTeams(data.data)}).catch(error => console.log(error));
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setPlayer(prevState => ({...prevState, [name]: value}));

    };


    const handleSubmit = (e)=>{
        e.preventDefault();
        Service.addPlayerToTeam(player).catch(error => console.log(error));
        navigate("/admin/players");
    }

    return (
        <div className="add-player-container">
            <h2>Додади играч во тимот:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Име:</label>
                    <input type="text" name="firstName"  onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="">Презиме: </label>
                    <input type="text" name="lastName"  onChange={handleChange} required/>
                </div>

                <select onChange={handleChange} required name="teamId" >
                    <option>Изберете тим</option>
                    {teams.length>0 && teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>


                    ))}
                </select>

                <button type="submit">Додади играч</button>
            </form>
        </div>
    );
};

export default AddPlayer;