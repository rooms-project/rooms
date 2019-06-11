import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return(


      <div>

        <div className="header">
            <FontAwesomeIcon className="logo" icon="person-booth" />
            <h3>ROOMS</h3>
        </div>
      
      </div>
      
    )
  }

}

export default Header