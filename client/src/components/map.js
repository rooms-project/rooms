import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
// import CurrentLocation from './map/current-location'

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
      rooms: [{lat: 40.443351, lng: -3.680213},
        {latitude: 40.453351, longitude: -3.280345},
        {latitude: 40.543351, longitude: -5.667345},
        {latitude: 40.643351, longitude: -3.180345},
        {latitude: 42.443351, longitude: -4.980345},
        {latitude: 46.443351, longitude: -1.680345}]
    }
    this.mapStyles = {
      width: '100%',
      height: '100%',  
    }
  }
  displayMarkers = () => {
    return this.state.rooms.map((room, index) => {
      return <Marker key={index} id={index} position={{
       lat: room.latitude,
       lng: room.longitude
     }}
     onClick={() => alert("You clicked me!")} />
    })
  }
  render() {
    return (
      <Map
          google={this.props.google}
          zoom={8}
          style={this.mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
      >
      {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9-z5odg8Pfi0AMseMq_6KocFN09_9FSw'
})(MapContainer);