import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './box.css';

class Box extends Component {
    constructor(props) {
        super(props)
        this.state = { room: {} }
    }
    render() {
        console.log(this.props)
        return (
            <div className="box">                
              {/* <h1 className="roomname">{this.props.room.roomname}</h1>
              <p>Description: {this.props.room.description}</p>
              <p>Tags: {this.props.room.tags}</p> */}
              {this.props.children}              
            </div>
        )
    }
}
export default Box