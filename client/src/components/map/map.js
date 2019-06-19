import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrentLocation from "./current-location";
import RoomService from "../../service/room-services";
import userServices from "../../service/user-services";
import "../map/map.css";
import Header from "../rooms-header";
import MapSearchBar from "../searchBar/map-searchBar";
import InfoWindowEx from "./InfoWindowEx";
import InfoWindowContent from "./InfoWindowContent";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedRoom: "",
      selectedRoomOwner: "",
      displayViewButton: false,
      Rooms: [],
      filteredRooms: []
    };
    this.services = new RoomService();
    this.userServices = new userServices();
  }

  

  componentDidMount() {
    this.update()
      // .catch(err => console.log(err));
  }
  update = () => {
    console.log("1234567891234567890912345678901234567890")
    this.services
      .getAllRooms()
      .then(allRooms => this.setState({ Rooms: allRooms }))
      .then(() => this.setState({ filteredRooms: this.state.Rooms }))
  }

  getUserRoom() {
    // console.log(this.props.userInSession.room[0])
    return this.props.userInSession.room[0];
  }

  hideWindow() {
    // console.log("hola hola hola");
    this.setState({ showingInfoWindow: false });
  }

  displayMarkers = () => {
    const { google } = this.props;
    const icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillColor: "tomato",
      strokeColor: "tomato",
      fill: "tomato",
      fillOpacity: 0.8,
      strokeWeight: 2
    };
    // console.log(this.state.filteredRooms)
    let followersArr = []
    return this.state.filteredRooms.map(room => {
      console.log("********** FOLLOWERS", room.followers.length)
      followersArr.push(room.followers.length)
      console.log(followersArr)

      if (!room.location) {
        return null;
      }
      // console.log(room._id)
      return (
        <Marker
          key={room._id}
          id={room._id}
          room={room}
          position={{
            lat: room.location.latitude,
            lng: room.location.longitude
          }}
          icon={icon}
          onClick={this.onMarkerClick}
        />
      );
    });
  };



  displayButton = () => {
    if (!this.props.userInSession)
      return (
        <Link className="map-buttons" to="/login">
          Create a room
        </Link>
      );
    else if (this.props.userInSession.room.length === 0)
      return (
        <Link
          className="map-buttons"
          to="/create"
          user={this.props.userInSession}
        >
          Create room
        </Link>
      );
    else
      return (
        <Link className="map-buttons" to={`/room/${this.getUserRoom()}`}>
          Go to your room
        </Link>
      );
  };

  pickRandom = marker => {
    const random =
      Math.floor(Math.random() * (this.state.Rooms.length - 0)) + 0;
    const randomRoom = this.state.Rooms[random];
    this.setState({
      selectedRoom: randomRoom
    });
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e)
    this.userServices.getOneUser(props.room.owner).then(owner => {
      this.setState({
        selectedRoom: props.room, 
        activeMarker: marker,
        selectedRoomOwner: owner.username,
        showingInfoWindow: true,
        displayViewButton: true
      });
    });
  };

  checkUser = () => {
    // console.log(this.props);
    this.setState({})
  };

  checkRooms = () => {
    return this.state.Rooms;
  };

  search = (search, tags) => {
    if (tags) {
      let filteredRooms = [...this.state.Rooms];
      let filteredRoomsByTag = []
      filteredRooms = filteredRooms.filter(room => {
        room.tags.map(tag => {
          if (tag.toLowerCase().includes(search.toLowerCase())) { 
            filteredRoomsByTag.push(room)
          } else return null
        })
        this.setState({ filteredRooms: filteredRoomsByTag });
      })        
    }
    else {
      // console.log("State en searchbar", this.state);
    let filteredRooms = [...this.state.Rooms];
    filteredRooms = filteredRooms.filter(room =>
      room.roomname.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ filteredRooms });
    // console.log(filteredRooms);
    }    
  };

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        displayViewButton: false,
        selectedRoom: "",
        selectedRoomOwner: ""
      });
    }
    // console.log(this.state.selectedRoom)
  };

  render() {
    return (
      <div className="map-container">
        <MapSearchBar search={this.search} />
        <CurrentLocation
          randomRoom={this.state.selectedRoom}
          centerAroundCurrentLocation
          google={this.props.google}
        >
          {this.displayMarkers()}
          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            className="info-window-main"
          >
            {/* <InfoWindowContent
              update={this.update}
              state={this.state}
              user={this.props.userInSession}
              search={this.search}
              onClose={this.onClose}
            /> */}
            <div className="info-window">
              <div className="info-window-img">
              <img
              src={this.state.selectedRoom.imageUrl}
              alt={this.state.selectedRoom.roomname}
              />
              </div>
              <span>{this.state.selectedRoom.followers ? this.state.selectedRoom.followers.length : "0"} followers</span>
            </div>
          </InfoWindowEx>
        </CurrentLocation>
        <div className="map-menu">
          <button
            type="submit"
            className="map-buttons"
            onClick={this.pickRandom}
          >
            Random room
          </button>
          {this.displayButton()}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC9-z5odg8Pfi0AMseMq_6KocFN09_9FSw"
})(MapContainer);


