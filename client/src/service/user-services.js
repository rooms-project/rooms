import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    updateUser = (id, passValue) => {
        return this.service.put(`updateUser/${id}`, passValue)
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }
}