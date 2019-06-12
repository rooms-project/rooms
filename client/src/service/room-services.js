import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:3000/api/'
        })
    }

    getAllRooms = () => {

        return this.service.get('getAllRooms', { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }


    getOneRoom = id => {
        return this.service.get(`getOneRoom/${id}`, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }

    postRoom = room => {
        return this.service.post('newRoom', room, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    handleUpload = theFile => {
        return this.service.post('/upload', theFile, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err));
    }
}