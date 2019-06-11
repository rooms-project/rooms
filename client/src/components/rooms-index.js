import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './rooms-index-header'


import { Link } from 'react-router-dom'
import Nav from "react-bootstrap/Nav";
class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalShow: false,
      modal:false

    }
    this.handleClick = this.handleClick.bind(this)

  }
  handleClick(){
   this.setState({ modalShow: true })
   console.log(this.state.modalShow)
  }

  render(){
    return(

      <div>

        <div className='rooms-index'>
          <Header/>
          <div className='index-info'>
              <h3>ROOMS</h3>
              <p>It’s a social media streaming 
                platform that shares
                your room with the world…</p>
          </div>
        
          <div className="search-container">
          <Link to="#"><FontAwesomeIcon className="search" icon="search" /></Link>
          </div>

          <div className="login">
          <button className='button-login' onClick={this.handleClick}>LOG IN</button>
          </div>
  
        </div>
        
      </div>
    )
  }

}

export default Index