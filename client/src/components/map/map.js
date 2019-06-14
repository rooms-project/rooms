import React, { Component } from 'react'
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import { Link } from 'react-router-dom'
import CurrentLocation from './current-location'
import RoomService from '../../service/room-services'
// import Rooms from './../../../src/rooms.json'
import '../map/map.css';
import Header from '../rooms-header'

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedRoom: "",
      displayViewButton: false,
      Rooms: []
    }
    this.services = new RoomService()
  }

  componentDidMount() {
    this.services.getAllRooms()
        .then(allRooms => this.setState({ Rooms: allRooms }))
        .catch((err) => console.log(err))
  }

  getUserRoom() { return this.props.userInSession.room[0] }
  
  displayMarkers = () => {
    return this.state.Rooms.map((room, index) => {
          if (!room.location) {
            return null
          }
          return <Marker key={room._id} id={room._id} room={room} position={{         
            lat: room.location.latitude,
            lng: room.location.longitude
          }}
         onClick={this.onMarkerClick} />
        })
  }
  
  displayViewButton = () => {
    if (this.state.displayViewButton === true) return <Link className="map-buttons" to={`/room/${this.state.selectedRoom._id}`}>View this room</Link>
  }

  displayButton = () => {
    if (!this.props.userInSession) return <Link className="map-buttons" to="/login">Create a room</Link>
    else if (this.props.userInSession.room.length === 0) return <Link className="map-buttons" to="/create" user={this.props.userInSession}>Create room</Link>
    else return <Link className="map-buttons" to={`/room/${this.getUserRoom()}`}>Go to your room</Link>
  }

  pickRandom = (marker) => {
    const random = Math.floor(Math.random() * (this.state.Rooms.length - 0)) + 0
    const randomRoom = this.state.Rooms[random]
    this.setState({
      selectedRoom: randomRoom,
    })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedRoom: props.room,
      activeMarker: marker,
      showingInfoWindow: true,
      displayViewButton: true
    });
  }

  checkUser = () => {
    console.log(this.props)
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        displayViewButton: false
      });
    }
  };

  render() {
    return (
      <div>
        {/* <Header/> */}
      <CurrentLocation randomRoom={this.state.selectedRoom} centerAroundCurrentLocation google={this.props.google}>
        {this.displayMarkers()}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
        <div className="info-window">
          <h1>{this.state.selectedRoom.roomname}</h1>
          <img src={this.state.selectedRoom.imageUrl} alt={this.state.selectedRoom.roomname}/>
          <p>{this.state.selectedRoom.description}</p>  
          <a href={'/room/' + this.state.selectedRoom.id}>View {this.state.selectedRoom.roomname}</a>
          <p>Followers {this.state.selectedRoom.followers}</p>      
        </div>
        </InfoWindow>

      </CurrentLocation>
      <div className="map-menu">  
        {this.displayViewButton()} 
        <button type="submit" className="map-buttons" onClick={this.pickRandom}>Random room</button>
        {this.displayButton()}
      </div>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9-z5odg8Pfi0AMseMq_6KocFN09_9FSw'
})(MapContainer);