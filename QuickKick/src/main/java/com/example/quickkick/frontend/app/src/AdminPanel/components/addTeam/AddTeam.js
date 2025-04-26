import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Service from "../../../repository/repository";
import "./addTeam.css"
const AddTeam = () => {

    const navigate = useNavigate();

   const [name, setName] = useState("");
   const [group, setGroup] = useState("");

   const handleChangeName = (e) => {
       setName(e.target.value);
   }

   const handleChangeGroup = (e) => {
       setGroup(e.target.value);
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        Service.addTeam({teamName: name, teamGroup: group}).then((response=>console.log(response)));
        navigate("/admin/teams");


    }
    return (
        <div className="add-team-container">
            <h2>Додади тим</h2>
            <form onSubmit={handleSubmit} className="add-team-form">
                <div>
                    <label htmlFor="">Име</label>
                    <input type="text" name="name" value={name} onChange={handleChangeName} />
                </div>
                <div>
                    <label htmlFor="">Група</label>

                    <select name="group" value={group} onChange={handleChangeGroup}>
                        <option value="">Избери група</option>
                        <option value="A">Група А</option>
                        <option value="B">Група Б</option>
                        <option value="C">Група В</option>
                        <option value="D">Група Г</option>
                    </select>
                </div>
                <button type="submit">ДОДАДИ ТИМ</button>
            </form>
            
        </div>
    );
};

export default AddTeam;