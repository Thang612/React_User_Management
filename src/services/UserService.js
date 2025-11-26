import axios from "./customize_axios"

const fetchAllUsers = (page) =>{
    return axios.get(`users?page=${page}`);
    // reqres-free-v1
}

const postCreateUser = (name, job) =>{
    return axios.post('users', {name, job})
}

const putEditUser = (name, job) =>{
    return axios.post('users', {name, job})
}

const deleteUser = (id) =>{
    return axios.delete(`users/${id}`)
}


export {fetchAllUsers, postCreateUser, putEditUser, deleteUser}