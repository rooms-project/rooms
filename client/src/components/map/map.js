import React, { Component } from 'react'
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import { Link } from 'react-router-dom'
import CurrentLocation from './current-location'
import RoomService from '../../service/room-services'
import '../map/map.css';
import Header from '../rooms-header'
import MapSearchBar from '../searchBar/map-searchBar';

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedRoom: "",
      displayViewButton: false,
      Rooms: [],
      filteredRooms: []
    }
    this.services = new RoomService()
  }

  componentDidMount() {
    this.services.getAllRooms()
        .then(allRooms => this.setState({ Rooms: allRooms }))
        .then(() => this.setState({filteredRooms: this.state.Rooms}))
        .catch((err) => console.log(err))
  }

  getUserRoom() { return this.props.userInSession.room[0] }
  
  displayMarkers = () => {
    return this.state.filteredRooms.map((room, index) => {
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
  checkRooms = () => {
    return this.state.Rooms
  }

  search = (search) => {
    console.log('State en searchbar', this.state);
		let filteredRooms = [ ...this.state.Rooms ];
		filteredRooms = filteredRooms.filter((room) => room.roomname.toLowerCase().includes(search.toLowerCase()))
    this.setState({ filteredRooms });    
    console.log(filteredRooms)
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
      <MapSearchBar search={this.search}/>
      <CurrentLocation randomRoom={this.state.selectedRoom} centerAroundCurrentLocation google={this.props.google}>
        {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          className="info-window-main"
        >
        <div className="info-window">
          <div className="info-window-img">
          <img src={this.state.selectedRoom.imageUrl} alt={this.state.selectedRoom.roomname}/>
          </div>
          <div className="info-window-content">
          <p>{this.state.selectedRoom.roomname}</p>
          <p>{this.state.selectedRoom.description}</p>  
          <a href={'/room/' + this.state.selectedRoom.id}>View {this.state.selectedRoom.roomname}</a>
          <p>Followers {this.state.selectedRoom.followers}</p>  
          </div>    
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