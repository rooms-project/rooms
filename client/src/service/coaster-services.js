import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    getAllCoasters = () => {

        return this.service.get('getAllCoasters', { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }


    getOneCoaster = id => {
        return this.service.get(`getOneCoaster/${id}`, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }

    postCoaster = coaster => {
        return this.service.post('newCoaster', coaster, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    handleUpload = theFile => {
        return this.service.post('/upload', theFile, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err));
    }
}