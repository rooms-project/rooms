import React, { Component } from 'react'
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import { Link } from 'react-router-dom'
import CurrentLocation from './current-location'
import Rooms from './../../../src/rooms.json'
import '../map/map.css';
import Header from '../rooms-header'



export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedRoom: {},
      displayViewButton: false,
      Rooms,
    };
  }
  

  displayMarkers = () => {
    return this.state.Rooms.map((room, index) => {
          return <Marker key={room.id} id={room.id} room={room} position={{
           lat: room.location.latitude,
           lng: room.location.longitude
         }}
         onClick={this.onMarkerClick} />
        })
  }
  displayViewButton = () => {
    if (this.state.displayViewButton === true) return <Link className="map-buttons" to="/create">View this room</Link>
  }
  displayButton = () => {
    if (!this.props.userInSession) return <Link className="map-buttons" to="/signup">Create a room</Link>
    else if (this.props.userInSession.room.length === 0) return <Link className="map-buttons" to="/create" user={this.props.userInSession}>Create room</Link>
    else return <Link className="map-buttons" to="/create">Go to your room</Link>
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    this.setState({
      selectedRoom: props.room,
      activeMarker: marker,
      showingInfoWindow: true,
      displayViewButton: true
    });
    console.log("Selected room:", this.state.selectedRoom)
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
        {this.checkUser()}
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
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
        <Link className="map-buttons" to="/create">Random room</Link>
        {this.displayButton()}
      </div>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9-z5odg8Pfi0AMseMq_6KocFN09_9FSw'
})(MapContainer);