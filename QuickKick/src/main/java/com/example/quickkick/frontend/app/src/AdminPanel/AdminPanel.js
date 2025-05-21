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
import StartSettings from "./playingMatch/StartSettings";
import StopWatch from "./playingMatch/stopwatchPanel/StopWatch";
import Login from "./Auth/Login";
import {AuthProvider} from "./Auth/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ListingMatches from "./imgGenerator/listingMatches/ListingMatches";

const AdminPanel = () => {
    return (
        <div>

            <AuthProvider>
                <ProtectedRoute><AdminNav /></ProtectedRoute>
            <Routes>

                <Route path="/teams" element={ <ProtectedRoute><TeamsList></TeamsList></ProtectedRoute>}></Route>
                <Route path="/teams/:id" element={<ProtectedRoute><EditTeam></EditTeam></ProtectedRoute>}></Route>
                <Route path="/add-team" element={<ProtectedRoute><AddTeam></AddTeam></ProtectedRoute>}></Route>
                <Route path="/players" element={<ProtectedRoute><ListAllPlayers></ListAllPlayers></ProtectedRoute>}></Route>
                <Route path={"/teams/:id/players"} element={<ProtectedRoute><ListPlayersByTeam /></ProtectedRoute>}></Route>
                <Route path={"/teams/:id/add-player"} element={<ProtectedRoute><AddPlayerToTeam></AddPlayerToTeam></ProtectedRoute>}></Route>
                <Route path={"/players/add-player"} element={<ProtectedRoute><AddPlayer></AddPlayer></ProtectedRoute>}></Route>
                <Route path={"/players/:id"} element={<ProtectedRoute><EditPlayer></EditPlayer></ProtectedRoute>}></Route>
                <Route path={"/matches"} element={<ProtectedRoute><MatchesList></MatchesList></ProtectedRoute>}></Route>
                <Route path={"/matches/add-match"} element={<ProtectedRoute><AddNewMatch></AddNewMatch></ProtectedRoute>}></Route>
                <Route path={"/matches/:id"} element={<ProtectedRoute><EditMatch></EditMatch></ProtectedRoute>}></Route>
                <Route  path={"/playing-match/start-settings/:id"} element={<ProtectedRoute><StartSettings></StartSettings></ProtectedRoute>}></Route>
                <Route path={"/generate-img"} element={<ProtectedRoute><ListingMatches></ListingMatches></ProtectedRoute>}></Route>
                <Route path={"/login"} element={<Login></Login>}></Route>
            </Routes>
            </AuthProvider>

        </div>
    );
};

export default AdminPanel;