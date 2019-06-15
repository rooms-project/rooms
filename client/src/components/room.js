import React, { Component } from 'react'
import roomServices from '../service/room-services'
import userServices from '../service/user-services'
import { Link } from 'react-router-dom'
import './box/box.css'
import './room/room.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = { room: {}, user: {}}
        this.roomServices = new roomServices()
        this.userServices = new userServices()
    }
    componentDidMount() {
        this.roomServices.getOneRoom(this.props.match.params.id)
            .then(theRoom => this.setState({ room: theRoom }))

        console.log(this.props)

        // this.userServices.getOneUser(this.state.room.owner)
        //     .then((theUser)=> {
        //         this.setState({ user: theUser })
        //         console.log(theUser)
        //         console.log(this.state.room.owner)
        //     })
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
                    <p><FontAwesomeIcon  icon="user"  className="profile-icon"/>{}</p>
                    <p>{this.state.room.tags}</p>
                    <button>Follow</button>
                    <button><FontAwesomeIcon  icon="heart"  className="like-button"/></button>
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

