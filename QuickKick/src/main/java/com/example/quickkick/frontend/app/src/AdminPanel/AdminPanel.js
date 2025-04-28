import React from 'react';

import AdminNav from "./components/navBar/AdminNav";
import TeamsList from "./components/teamsList/teamsList";
import {Route, Routes} from "react-router-dom";
import EditTeam from "./components/editTeam/EditTeam";
import AddTeam from "./components/addTeam/AddTeam";
import ListAllPlayers from "./players/ListAllPlayers";
import ListPlayersByTeam from "./players/ListPlayersByTeam/ListPlayersByTeam";
import AddPlayerToTeam from "./players/addPlayer/AddPlayerToTeam";
import AddPlayer from "./players/addPlayer/AddPlayer";
import EditPlayer from "./players/editPlayer/EditPlayer";
import MatchesList from "./matches/matchesList/matchesList";
import AddNewMatch from "./matches/addMatch/AddNewMatch";
import EditMatch from "./matches/editMatch/EditMatch";

const AdminPanel = () => {
    return (
        <div>
            <AdminNav />
            <Routes>
                <Route path="/teams" element={<TeamsList></TeamsList>}></Route>
                <Route path="/teams/:id" element={<EditTeam></EditTeam>}></Route>
                <Route path="/add-team" element={<AddTeam></AddTeam>}></Route>
                <Route path="/players" element={<ListAllPlayers></ListAllPlayers>}></Route>
                <Route path={"/teams/:id/players"} element={<ListPlayersByTeam />}></Route>
                <Route path={"/teams/:id/add-player"} element={<AddPlayerToTeam></AddPlayerToTeam>}></Route>
                <Route path={"/players/add-player"} element={<AddPlayer></AddPlayer>}></Route>
                <Route path={"/players/:id"} element={<EditPlayer></EditPlayer>}></Route>
                <Route path={"/matches"} element={<MatchesList></MatchesList>}></Route>
                <Route path={"/matches/add-match"} element={<AddNewMatch></AddNewMatch>}></Route>
                <Route path={"/matches/:id"} element={<EditMatch></EditMatch>}></Route>
            </Routes>

        </div>
    );
};

export default AdminPanel;