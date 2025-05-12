import axios from "../custom-axios/axios.js"

const Service = {

    //TEAMS
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

    //PLAYERS
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
        fetchTopTenPlayers: () =>{
        return axios.get("/players/top-players");
        },


    //MATCHES

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
    loadLastMatches: () => {
        return axios.get("matches/last-finished");
    },
    fetchUpcomingMatches:()=>{
        return axios.get("matches/upcoming");
    },
    fetchMatchesByTeam: (teamId) =>{
        return axios.get(`/teams/${teamId}/matches`);
    },
    fetchAllMatchesByStatus: (matchStatus) =>{
        return axios.get(`/matches/status`,{
            params:matchStatus
        });
    },



    //PLAYINGMATCHES
    fetchPlayingMatchByMatchId: (matchId) =>{
        return axios.get(`/playing-matches/match/${matchId}`);
    },
    createPlayingMatch: (matchData) =>{
        return axios.post(`/playing-matches`, matchData)
    },
    fetchPlayingMatch: (matchId) =>{
        return axios.get(`/playing-matches/${matchId}`);
    },


    //CONTROLLING LIVE MATCH
    addGoalToTeam:(id, teamNumber)=>{
        return axios.post(`/playing-matches/${id}/addGoal/${teamNumber}`);

    },
    subGoalFromTeam: (id,teamNumber) =>{
        return axios.post(`/playing-matches/${id}/removeGoal/${teamNumber}`);


    },
    addFaulToTeam: (id, teamNumber) =>{
        return axios.post(`/playing-matches/${id}/addFaul/${teamNumber}`);
    },
    subFaulFromTeam: (id,teamNumber) =>{
        return axios.post(`/playing-matches/${id}/removeFaul/${teamNumber}`);

    },
    signalMinutePassed: (id) => {
        return axios.post(`/playing-matches/${id}/subMinutes/1`);
    },
    signalStartOfMatch: (id) =>{
        return axios.post(`/playing-matches/${id}/start`);
    },
    signalHalfTime:(id) =>{
        return axios.post(`/playing-matches/${id}/halfTime`);
    },
    signalPlayingAgain:(id) =>{
        return axios.post(`/playing-matches/${id}/signalPlayingAgain`);
    },
    signalTimeout:(id) =>{
        return axios.post(`/playing-matches/${id}/signalTimeout`);
    },
    finishMatch: (id,request) =>{
        return axios.post(`/matches/${id}/finish`, request);
    },
    submitGoals: (payload) =>{
        return axios.post(`/players/add-goals`, payload);
    },



    //AUTH
    login: (data) =>{
        return axios.post(`/users/login`, data);
    }



}

export default Service;