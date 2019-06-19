import React, { Component } from 'react'
import roomServices from '../service/room-services'
import userServices from '../service/user-services'
import { Link } from 'react-router-dom'
import './box/box.css'
import './room/room.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chat } from "./chat/Chat";
import Streaming from "./streaming/Streaming"

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = { room: {}, user: {}}
        this.roomServices = new roomServices()
        this.userServices = new userServices()
    }

    componentDidMount() {
        this.roomServices.getOneRoom(this.props.match.params.id)
        
            .then((theRoom) => {
                this.setState({ room: theRoom })
                //console.log(this.state.room.owner)
                this.userServices.getOneUser(this.state.room.owner)
                .then((theUser)=> {
                    this.setState({ user: theUser })
                     console.log(this.state.user)
                })
            })
            .catch(error => console.log(error))
    }
    render() {
        console.log(this.state.room._id)
        return (
            <div className="room">
                
                <div className="videoplayer">
                    <div className="video">
                    {/* <video controls="controls" 
                        className="video-stream" 
                        x-webkit-airplay="allow" 
                        data-youtube-id="N9oxmRT2YWw"  
                        src="http://www.youtube.com/watch?v=OmxT8a9RWbE"
                        >
                    Your browser does not support the video tag.
                    </video> */}
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/uTnFrh6CyK4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    <Streaming id={this.state.room._id}/>
                    </div>
                        <div className="box"> 
                

                                    <div className="title-wrapper">
                                        <h1 className="roomname">{this.state.room.roomname}</h1>
                                        <h5>{this.state.room.description}</h5>
                                        <div className="followers-streams">
                                            <p>{this.state.room.tags}</p>
                                            <p><FontAwesomeIcon  icon="user"  className="profile-icon"/> {this.state.user.username !== undefined ? this.state.user.username : null}</p> 
                                            <p className="margin-left">Followers: {this.state.room.followers === []? this.state.room.followers : "0"}</p>
                                            {/* <p class="margin-left">Streams: {this.state.room.streams ? this.state.room.streams : "0"}</p> */}
                                        </div>
                                    </div>
                                    <div className='room-button-container'>
                                        <button className='button-follow margin-bottom'>Follow</button>
                                        {/* <button className='button-like'><FontAwesomeIcon  icon="heart"  className="like-button"/></button> */}
                                    </div>


                                {/* <div className="room-header">

                                    <div className='room-icons'>
                                        <p><FontAwesomeIcon  icon="heart"  className="like-button"/> {this.state.room.likes ? this.state.room.likes : "0"}</p>
                                        <p><FontAwesomeIcon  icon="eye"  className="like-button"/> {this.state.room.views ? this.state.room.views : "0"}</p>
                                    </div>

                                </div> */}
                       

                        </div>

                </div>
                
             
                <div className="chat">
                    <div className="box-chat"> 
                            
                            <Chat />
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Room