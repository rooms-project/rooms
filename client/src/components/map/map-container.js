import React, { Component } from 'react'
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import { Link } from 'react-router-dom'
import CurrentLocation from './map'
import Rooms from './../../../src/rooms.json'


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedRoom: {},
    Rooms,
  };

  displayMarkers = () => {
    return this.state.Rooms.map((room, index) => {
          // console.log(room)
          return <Marker key={room.id} id={room.id} room={room} position={{
           lat: room.location.latitude,
           lng: room.location.longitude
         }}
         onClick={this.onMarkerClick} />
        })
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    this.setState({
      selectedRoom: props.room,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log("Selected room:", this.state.selectedRoom)
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  chapuzaHandler = () => {
    console.log("Holi")
    window.history.pushState('page2', 'Title', '/patata');
  }

  render() {
    return (
      <React.Fragment>
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
        <div>
          <h4>{this.state.selectedRoom.roomname}</h4>
          <img src={this.state.selectedRoom.imageUrl} alt={this.state.selectedRoom.roomname}/>
          <p>{this.state.selectedRoom.description}</p>          
        </div>
        </InfoWindow>        
      </CurrentLocation>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9-z5odg8Pfi0AMseMq_6KocFN09_9FSw'
})(MapContainer);