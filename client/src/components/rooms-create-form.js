import React, { Component } from 'react'
import RoomServices from '../service/room-services'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import { Link } from 'react-router-dom'
import './create/form.css';

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
                tags: [],
                followers: [],
                owner: undefined,
            },
            hidden: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.services = new RoomServices()
    }

    componentDidMount() {
        this.currentLocation()
        this.getOwnerId()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            room: {
                ...this.state.room,
                [name]: value
            }
        })
    }
    // handleTags = () => {
    //     this.setState(
    //         {
    //         ...this.state,
    //         room: {
    //             ...this.state.room,
    //             tags: this.state.room.tags.split(",")
    //         }
    //     }, () => console.log("handleTags -> Los tags son:", this.state.room.tags))
    // }

    getOwnerId() {
        console.log("getOwnerId -> El Id de usuario es:", this.props.userInSession._id)
        this.setState(
            {
            ...this.state,
            room: {
                ...this.state.room,
                owner: this.props.userInSession._id
            }
        }, () => console.log("getOwnerId -> El estado es:", this.state.room) )
           
    }

    currentLocation() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
            var coords = pos.coords;
            console.log("currentLocation -> Location de usuario es:", coords)
            this.setState(
                {
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
            
            }, () => console.log("currentLocation -> El state es:", this.state.room.location)
            );
        }
    }

    handleHiddenChange = (event, hidden) => {
        this.setState(state => ({
          hidden,
          // hidden implies !open
          open: hidden ? false : state.open,
        }));
      };

    handleSubmit = e => {
        e.preventDefault()
        this.services.postRoom(this.state.room)
            .then(x => {
                window.location.href = "/map"
            }) //O llevar al room
    }

    render() {
        console.log("Create new room form page:")
        return (
            <div className="create-form">            
            <form onSubmit={this.handleSubmit}>
                <h1>Create a room</h1>                            
                <input onChange={this.handleChange} value={this.state.room.roomname} type="text" className="form-control" id="roomname" name="roomname" placeholder = "Name your room"/>
                <input onChange={this.handleChange} value={this.state.room.description} type="text" className="form-control" id="description" name="description" placeholder = "Describe your room"/>
                {/* Habrá que hacer un handlechange especial para los tags ¿? */}
                <input onChange={this.handleChange} value={this.state.room.tags} type="text" className="form-control" id="tags" name="tags" placeholder = "Tags"/>
                <FormControlLabel
                control={
                    <Switch
                    checked={this.state.hidden}
                    onChange={this.handleHiddenChange}
                    value="hidden"
                    color="primary"
                    />
                }
                label="Hidden"
                />
                <div className="location-radio">
                <input onChange={this.handleChange} value={this.state.room.location} type="radio" className="form-control radio" id="location" name="location"/>
                <label>Don't share my location</label>            
                </div>        
                <button type="submit">Create</button>
            </form>
        </div>
        )
    }
}

export default CreateRoom