import axios from "../custom-axios/axios.js"

const Service = {
    fetchTeams: () =>{
        return axios.get("/teams");
    }
}

export default Service;