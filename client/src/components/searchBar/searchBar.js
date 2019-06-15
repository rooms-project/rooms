import React, { Component } from "react";
import RoomService from '../../service/room-services'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      Rooms: []
    };
    this.services = new RoomService()
  }

  componentDidMount() {
    this.services.getAllRooms()
        .then(allRooms => this.setState({ Rooms: allRooms }))
        .catch((err) => console.log(err))
  }
    
  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({[name]: value})
    console.log('State en searchbar', this.state);
		let filteredRooms = [ ...this.state.Rooms ];
		filteredRooms = filteredRooms.filter((room) => room.roomname.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({ filteredRooms });    
    console.log(filteredRooms)
  }

  render() {
    return (
      <input className="search-bar" type="text" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search Room"/>
    )
  }
}
