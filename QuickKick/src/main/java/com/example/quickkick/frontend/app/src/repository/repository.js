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
    fetchAllPlayers: () =>{
        return axios.get("/players");
    }
}

export default Service;