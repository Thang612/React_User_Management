import axios from "./customize_axios"

const fetchAllUsers = (page) =>{
    return axios.get(`users?page=${page}`);
    // reqres-free-v1
}

export {fetchAllUsers}