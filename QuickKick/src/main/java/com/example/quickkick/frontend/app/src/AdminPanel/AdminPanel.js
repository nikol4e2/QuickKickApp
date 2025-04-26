import React from 'react';

import AdminNav from "./components/navBar/AdminNav";
import TeamsList from "./components/teamsList/teamsList";
import {Route, Routes} from "react-router-dom";
import EditTeam from "./components/editTeam/EditTeam";
import AddTeam from "./components/addTeam/AddTeam";

const AdminPanel = () => {
    return (
        <div>
            <AdminNav />
            <Routes>
                <Route path="/teams" element={<TeamsList></TeamsList>}></Route>
                <Route path="/teams/:id" element={<EditTeam></EditTeam>}></Route>
                <Route path="/add-team" element={<AddTeam></AddTeam>}></Route>
            </Routes>

        </div>
    );
};

export default AdminPanel;