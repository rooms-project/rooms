import React, { Component } from 'react'
import RoomService from '../service/room-services'
import { Link } from 'react-router-dom'
import './room/room.css';
import Box from '../components/box/box'

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = { room: {} }
        this.services = new RoomService()
    }
    componentDidMount() {
        this.services.getOneRoom(this.props.match.params.id)
            .then(theRoom => this.setState({ room: theRoom }))
    }
    render() {
        return (
            <div className="room">
                <div>
                <video controls="controls" 
                    className="video-stream" 
                    x-webkit-airplay="allow" 
                    data-youtube-id="N9oxmRT2YWw"  
                    src="http://www.youtube.com/watch?v=OmxT8a9RWbE"
                >
                Your browser does not support the video tag.
                </video>
                <div className="box"> 
                    <h1 className="roomname">{this.state.room.roomname}</h1>
                    <p>{this.state.room.description}</p>
                    <p>{this.state.room.tags}</p>
                </div>
                </div>
                <div className="chat">
                    <h1>CHAT</h1>
                    <p>PEPE ============  Lasdfokmads[fmsa[dmfa[sdmfasdmf</p>
                    <p>ijfadoifjaodifjaoidjfoasidjfoaisdjf =========PEPE2</p>
                </div>
            </div>
        )
    }
}
export default Room