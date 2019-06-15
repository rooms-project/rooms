import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './search.css';


export default class MapSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    }
  }

  componentDidMount() {
    console.log(this.props)
    // this.services.getAllRooms()
    //     .then(allRooms => this.setState({ Rooms: allRooms }))
    //     .catch((err) => console.log(err))
  }
    
  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({[name]: value}, () => {this.props.search(this.state.search)})
  }

  render() {
    return (    
      <div className="search-bar"> 
        <input className="search-input" type="text" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search Room"/>
        <button className="search-icon" type="submit"><FontAwesomeIcon className="search" icon="search"/></button>
      </div>  
    )
  }
}