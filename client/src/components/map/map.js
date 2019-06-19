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

//Icons
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
//


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
  }
  update = () => {
    this.services
      .getAllRooms()
      .then(allRooms => this.setState({ Rooms: allRooms }))
      .then(() => this.setState({ filteredRooms: this.state.Rooms }))
  }

  getUserRoom() {
    return this.props.userInSession.room[0];
  }

  hideWindow() {
    this.setState({ showingInfoWindow: false });
  }

  displayMarkers = () => {
    const { google } = this.props;
    
    // console.log(this.state.filteredRooms)
    let followersArr = []
    return this.state.filteredRooms.map(room => {
      let icon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: "tomato",
        // strokeColor: "tomato",
        fill: "tomato",
        fillOpacity: 1,
        strokeWeight: 0
      };
      followersArr.push(room.followers.length)
      let maxFollowers = Math.max.apply(null, followersArr)

      let followersRatio
      room.followers.length ? followersRatio = room.followers.length / maxFollowers : followersRatio = 0
      if (followersRatio === 1) { icon.fillColor = "#ff4800"; console.log("MAXIMO", ) }
      if (followersRatio >= 0.8 && followersRatio < 1 ) { icon.fillColor = "black" }
      if (followersRatio >= 0.6 && followersRatio < 0.8 ) { icon.fillColor = "black" }
      if (followersRatio >= 0.4 && followersRatio < 0.6 ) { icon.fillColor = "white" }
      if (followersRatio < 0.4) { icon.fillColor = "white" }

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
    this.onClose()
    this.setState({
      selectedRoom: randomRoom
    });
  };

  onMarkerClick = (props, marker, e) => {
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
    let filteredRooms = [...this.state.Rooms];
    filteredRooms = filteredRooms.filter(room =>
      room.roomname.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ filteredRooms });
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
  };

  // InfoWindowContent functions

  // Enter room

  enterRoom = () => {
    window.location.href = `/room/${this.state.selectedRoom._id}`;
  };

  // HandleSearch

  handleSearch = tag => {
    this.search(tag, true);
    this.onClose();
  };

  // Get tags

  getTags = () => {
    if (!this.state.selectedRoom) return null;
    if (!this.state.selectedRoom.tags) return "The room has no tags";
    return this.state.selectedRoom.tags.map(tag =>
      tag[0] === "#" ? (
        <button
          key="0"
          className="info-window-tag"
          onClick={() => this.handleSearch(tag)}
        >
          {tag}
        </button>
      ) : (
        <button
          key="1"
          className="info-window-tag"
          onClick={() => this.handleSearch(tag)}
        >{`#${tag} `}</button>
      )
    );
  };

  // Follow buttons

  setFollowButton = () => {
    //Lógica follow/unfollow
    if (!this.props.userInSession) return null;
    if (this.props.userInSession.following.includes(this.state.selectedRoom._id)) {
      return (
        <button className="info-window-btn" onClick={() => this.unfollowRoom()}>
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          className="info-window-btn info-window-following"
          onClick={() => this.followRoom()}
        >
          Follow
        </button>
      );
    }
  };

  followRoom = () => {
      
      this.state.selectedRoom.followers.push(this.props.userInSession._id)
      this.props.userInSession.following.push(this.state.selectedRoom._id)

      this.userServices.updateFollowing(this.state.selectedRoom._id,this.props.userInSession._id, "follow")
        .then(()=> console.log("------------------------------------follow------------------------------"))
        .catch(()=> console.log("-------------------------------------------CATCH----------------------------"))
      this.update()
  };

  unfollowRoom = () => {

    this.state.selectedRoom.followers.splice(
      this.state.selectedRoom.followers.indexOf(this.props.userInSession._id), 1);
    this.props.userInSession.following.splice(
      this.props.userInSession.following.indexOf(this.state.selectedRoom._id), 1);

    this.userServices.updateFollowing(this.state.selectedRoom._id, this.props.userInSession._id, "unfollow")
    .then(()=> console.log("------------------------------------unfollow------------------------------"))
    .catch(()=> console.log("-------------------------------------------CATCH----------------------------"))
    this.update()
  };

  //
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
            <div className="info-window">
                    <div className="info-window-img">
                      <img
                        src={this.state.selectedRoom.imageUrl}
                        alt={this.state.selectedRoom.roomname}
                      />
                    </div>
                    <div className="info-window-content">
                      <ul>
                        <li>
                          <FontAwesomeIcon className="icon-home" icon={faHome}/>
                          <span className="roomname">
                            {this.state.selectedRoom.roomname}
                          </span>
                          <FontAwesomeIcon className="icon-user" icon="user" />
                          <span className="owner">{this.state.selectedRoomOwner}</span>
                        </li>
                        <li>
                          <FontAwesomeIcon className="icon" icon={faStickyNote}/>
                          <span>{this.state.selectedRoom.description}</span>
                        </li>
                        <li>
                          <FontAwesomeIcon className="icon" icon={faTags}/>
                          <span>{this.getTags()}</span>
                        </li>
                        <li>
                          <FontAwesomeIcon className="icon" icon={faUsers}/>
                          <span>{this.state.selectedRoom.followers ? this.state.selectedRoom.followers.length : "0"} followers</span>
                        </li>
                      </ul>
                      <button type="button" className="info-window-btn" onClick={this.enterRoom}>
                        Enter room
                      </button>
                      {this.setFollowButton()}
                    </div>
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


