import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    rooms: [{lat: 40.443351, lng: -3.680213},
      {latitude: 40.453351, longitude: -3.280345},
      {latitude: 40.543351, longitude: -5.667345},
      {latitude: 40.643351, longitude: -3.180345},
      {latitude: 42.443351, longitude: -4.980345},
      {latitude: 46.443351, longitude: -1.680345}]
  };

  displayMarkers = () => {
    return this.state.rooms.map((room, index) => {
      return <Marker key={index} id={index} position={{
       lat: room.latitude,
       lng: room.longitude
     }}
     onClick={() => alert("You clicked me!")} />
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {/* <Marker onClick={this.onMarkerClick} name={'current location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> */}
        {this.displayMarkers()}
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9-z5odg8Pfi0AMseMq_6KocFN09_9FSw'
})(MapContainer);