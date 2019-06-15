import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:3000/api/user/'
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