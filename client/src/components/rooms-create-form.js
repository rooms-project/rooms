import React, { Component } from 'react'
import RoomServices from '../service/room-services'
import { Link } from 'react-router-dom'


class CreateRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            room: {
                roomname: '',
                description: '',
                location: {
                    latitude: undefined,
                    longitude: undefined,
                },
                tags: []
            },
            show: false
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.services = new RoomServices()
    }

    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })

    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            room: {
                ...this.state.room,
                [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state.room)
        this.currentLocation()
        this.services.postRoom(this.state.room)
            .then(x => {
                window.location.href = "/map"
            }) //O llevar al room
    }

    currentLocation() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
            var coords = pos.coords;
            this.setState({
                ...this.state,
                room: {
                    ...this.state.room,
                    location: {                     
                        ...this.state.room.location,
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    }
                }
            })
            });
        }
    }
    

    // handleFilEnviareUpload = e => {

    //     const uploadData = new FormData();
    //     uploadData.append("imageUrl", e.target.files[0]);

    //     this.services.handleUpload(uploadData)
    //         .then(response => {
    //             this.setState({
    //                 coaster: {
    //                     ...this.state.coaster, imageUrl: response.secure_url
    //                 }
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }

    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>                            
                <input onChange={this.handlechange} value={this.state.room.roomname} type="text" className="form-control" id="roomname" name="roomname" placeholder = "Name your room"/>
    
                <input onChange={this.handlechange} value={this.state.room.description} type="text" className="form-control" id="description" name="description" placeholder = "Describe your room"/>

                {/* Habrá que hacer un handlechange especial para los tags ¿? */}
                <input onChange={this.handlechange} value={this.state.room.tags} type="text" className="form-control" id="tags" name="tags" placeholder = "Tags"/>
                
                <div className="location-radio">
                <input onChange={this.handlechange} value={this.state.room.location} type="radio" className="form-control radio" id="location" name="location"/>
                <label>Don't share my location</label>            
                </div>        
                <Link type="submit" onClick={this.handleSubmit} className="send-form-button">Create</Link>
            </form>
        </div>
        )
    }
}

export default CreateRoom