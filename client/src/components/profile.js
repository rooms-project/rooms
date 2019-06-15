import React, { Component } from 'react'
import AuthServices from '../service/auth-services'
import { Link } from 'react-router-dom'
import roomServices from '../service/room-services'
import userServices from '../service/user-services'
import './box/box.css'
import './room/room.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '' }
        this.services = new AuthServices()
        this.roomServices = new roomServices()
        this.userServices = new userServices()
    }
    componentDidMount() {
        console.log(this.props.loggedInUser.username)
        console.log(this.props.loggedInUser)
        this.roomServices.getOneRoom(this.props.match.params.id)
        
            .then((theRoom) => {
               
                this.setState({ room: theRoom })
                this.userServices.getOneUser(this.state.room.owner)

                .then((theUser)=> {
                    this.setState({ user: theUser })
                })

            })

            .catch(error => console.log(error))

    }


    render() {
        return (
            <div className="profile-container">

                   <div className="profileHeader">

                            <img className="profile-pic" src={this.props.loggedInUser.imageUrl} />
                            <h1 className="roomname">{this.props.loggedInUser.username}</h1> 

                    </div>

                    <div className="box">   



                            <div className="room-header">
                                <h1>Your Room:</h1>
                                <p>{this.props.loggedInUser.room === [] ? this.props.loggedInUser.room : "You don't have a room yet"}</p>

                                <div className='room-icons'>
                                    {/* <p><FontAwesomeIcon  icon="user"  className="profile-icon"/> {this.state.user.username}</p>
                                    <p><FontAwesomeIcon  icon="heart"  className="like-button"/> {this.state.room.likes ? this.state.room.likes : "0"}</p>
                                    <p><FontAwesomeIcon  icon="eye"  className="like-button"/> {this.state.room.views ? this.state.room.views : "0"}</p> */}
                                </div>

                                <div className='room-button-container'>
                                    <button className='button-follow'>Follow</button>
                                    <button className='button-like'><FontAwesomeIcon  icon="heart"  className="like-button"/></button>
                                </div>

                            </div>
                    
                    </div>

            </div>
        )
    }

}

export default Profile