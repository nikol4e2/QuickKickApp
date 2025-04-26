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

    fetchTeamsByGroup:(group)=>{
        return axios.get("/teams/group",{
            params:{
                group: group
            }
        });
    }
}

export default Service;