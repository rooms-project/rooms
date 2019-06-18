import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:3000/api/users/'
        })
    }
    getAllUsers = () => {
        return this.service.get('getAllUsers', { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }

    updateUser = (id, passValue) => {
        return this.service.put(`updateUser/${id}`, passValue)
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }
    
    updateFollowing = (roomId,userId,action) => {
        // console.log(roomId,userId,action)
        console.log("0000000000000000000000000000000000000000000000000000000000000 ")
        return this.service.put("updateFollowing", {roomId,userId,action})
        .then(res => console.log("THEN---------------------------------------------------------"))
        .catch(()=> console.log("111111111111111111111111111111111111111111111111111111"))
    }

    postUser = user => {
        return this.service.post('newUser', user, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    getOneUser = (id) => {
        return this.service.get(`getOneUser/${id}`)
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }

}