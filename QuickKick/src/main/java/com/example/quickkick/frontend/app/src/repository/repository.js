import axios from "../custom-axios/axios.js"

const Service = {
    fetchTeams: () =>{
        return axios.get("/teams");
    },
    fetchTeam: (id) =>{
        return axios.get(`/teams/${id}`);
    },

    updateTeam: (id,teamData) =>{
        return axios.put(`/teams/${id}`, teamData);
    },
    addTeam: (teamData) =>{
        return axios.post("/teams", teamData);
    },

    fetchTeamsByGroup:(group)=>{
        return axios.get("/teams/group",{
            params:{
                group: group
            }
        });
    },
    deleteTeam: (id)=>{
        return axios.delete(`/teams/${id}`);
    },
    fetchAllPlayers: () =>{
        return axios.get("/players");
    },
    fetchAllPlayersByTeam: (teamId) =>{
        return axios.get(`/teams/${teamId}/players`);
    },
    addPlayerToTeam: (playerData) =>{
        return axios.post(`/players`, playerData);
    },
    deletePlayer:(playerId) =>{
        return axios.delete(`/players/${playerId}`);
    },
    fetchPlayer: (playerId) =>{
        return axios.get(`/players/${playerId}`);
    },
    updatePlayer: (playerId,playerData) =>{
        return axios.put(`/players/${playerId}`, playerData);
    },




    fetchAllMatches: () =>{
        return axios.get("/matches");
    },
    addMatch:(matchData) =>{
        return axios.post(`/matches`, matchData);
    },
    fetchMatch: (matchId) =>{
        return axios.get(`/matches/${matchId}`);
    },
    editMatch: (matchId,matchData) =>{
        return axios.put(`/matches/${matchId}`, matchData);
    },
    deleteMatch: (matchId) =>{
        return axios.delete(`/matches/${matchId}`);
    },
    fetchTopTenPlayers: () =>{
        return axios.get("/players/top-players");
    }

}

export default Service;