import React, { Component } from 'react'
import AuthServices from '../service/auth-services'
import { Link } from 'react-router-dom'
import roomServices from '../service/room-services'
import userServices from '../service/user-services'
import './box/box.css'
import './profile/profile.css'
import './room/room.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Icons
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
//


class Profile extends Component {

   constructor(props) {
       super(props)
       this.state = { username: '', password: '', room: '', following: [] }
       this.services = new AuthServices()
       this.roomServices = new roomServices()
       this.userServices = new userServices()
   }
   componentDidMount() {
    this.update()
   }
   update = () => {
    this.getRoomOwner()           
    this.getUserRoom()
    this.getFollowingRooms()
   }
   
   getRoomOwner() {
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

   getUserRoom() {
       console.log(this.props.loggedInUser.room)
       console.log(this.props.loggedInUser._id)
        this.roomServices.getOneRoom(this.props.loggedInUser.room)
            .then((res) =>  this.setState({room: res.roomname}))
            .catch(error => console.log(error))       
   }
   deleteRoom(user) {
       this.roomServices.deleteRoom(user.room[0])
       this.userServices.updateUser(user._id, {room: []})
            .then(() => this.setState({room: []})) 
            .catch(error => console.log(error))
       this.props.loggedInUser.room = []
   }
   getRoomHeader() {
       console.log(this.props.loggedInUser.room)
        if(this.props.loggedInUser.room.length === 1) {
           return <p>Your room {this.state.room} <Link to={`/room/${this.props.loggedInUser.room[0]}`}>Go to your room</Link> <span onClick={() => this.deleteRoom(this.props.loggedInUser)}>Delete room</span></p>
        }
        else return <Link to={"/create"}>Create room</Link>
    }

    getFollowingRooms() {
        let roomsArray = []
        this.props.loggedInUser.following.map(room => {
            this.roomServices.getOneRoom(room)
            .then(theRoom => {
                roomsArray.push(theRoom)
                this.setState({following: roomsArray})
            })
        })
    }

    displayFollowingRooms() { //Se debería hacer con .populate en el back pero ya se ha conseguido hacer así
        return this.state.following.map((room) => {
            console.log(room)
            return ( //room.
                <div className="following">
                <div className="following-img">
                  <img
                    src={room.imageUrl}
                    alt={room.roomname}
                  />
                </div>
                <div className="info-window-content following-content">
                  <ul>
                    <li>
                      <FontAwesomeIcon className="icon-home" icon={faHome}/>
                      <span className="roomname">
                        {room.roomname}
                      </span>
                      <FontAwesomeIcon className="icon-user" icon="user" />
                      {/* <span className="owner">{room.selectedRoomOwner}</span> */}
                    </li>
                    <li>
                      <FontAwesomeIcon className="icon" icon={faStickyNote}/>
                      <span>{room.description}</span>
                    </li>
                    {/* <li>
                      <FontAwesomeIcon className="icon" icon={faTags}/>
                      <span>{this.getTags()}</span>
                    </li> */}
                    {/* <li>
                      <FontAwesomeIcon className="icon" icon={faUsers}/>
                      <span>{this.state.selectedRoom.followers ? this.state.selectedRoom.followers.length : "0"} followers</span>
                    </li> */}
                  </ul>
                  <button type="button" className="info-window-btn" onClick={this.enterRoom}>
                    Enter room
                  </button>
                  {/* {this.setFollowButton()} */}
                </div>
              </div>
            )
        })

    }
    render() {
       return (
           <div className="profile-container">

                  <div className="profileHeader">

                           <img className="profile-pic" src={this.props.loggedInUser.imageUrl} />
                           <h1 className="roomname">{this.props.loggedInUser.username}</h1>

                   </div>

                   <div className="box box-profile">



                           <div className="room-header">
                               {this.getRoomHeader()}
                                <div className='room-icons'>
                                   {/* <p><FontAwesomeIcon  icon="user"  className="profile-icon"/> {this.state.user.username}</p>
                                   <p><FontAwesomeIcon  icon="heart"  className="like-button"/> {this.state.room.likes ? this.state.room.likes : "0"}</p>
                                   <p><FontAwesomeIcon  icon="eye"  className="like-button"/> {this.state.room.views ? this.state.room.views : "0"}</p> */}
                               </div>

                               {/* <div className='room-button-container'>
                                   <button className='button-follow'>Follow</button>
                                   <button className='button-like'><FontAwesomeIcon  icon="heart"  className="like-button"/></button>
                               </div> */}

                           </div>

                   </div>

                   <div className="box box-profile">



                           <div className="room-header">
                               <p>Following:</p>
                               {this.displayFollowingRooms()}
                           </div>

                   </div>

           </div>
       )
   }

}

export default Profile