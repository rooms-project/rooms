import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import AuthServices from '../../service/auth-services'
import  { Redirect } from 'react-router-dom'


class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
           username: '', password: '', show: false, redirect: false
        }
        this.services = new AuthServices()
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
      
    }
    // renderRedirect = () => {
    //   this.setState({redirect: true})
    // }
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //       return <Redirect to='/map' />
    //     }
    // }

    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {

        e.preventDefault()
        const { username, password } = this.state
        this.services.login(username, password)
            .then(response => {
                this.setState({ username: '', password: '', redirect: true })
                this.props.setUser(response)
                this.props.setUserIndex(response)
            })
            .catch(error => console.log(error.response.data.message))
    }


    render() {
        return (
          <div>
          
          {this.state.redirect && <Redirect to='/map' />}
          
                <button className='button-login' onClick={this.handleShow}>LOG IN</button>
       
          
                <Modal show={this.state.show} onHide={this.handleClose}>
          
          <div className="modaltop" >
            
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <div className='modalbody'>
                        <form onSubmit={this.handleSubmit} action="/map"> 
                   
                                <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" placeholder = "Name"/>
                   
                                <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" placeholder = "Password"/>
                                <p>Don't have an account yet ?</p>
                                <Link id="signup-link" to="/signup">Sign Up</Link>

                                <div>
                                    
                                    <button type="submit" className="send-form-button" onClick={()=>this.setState({})}>Login</button>
                                </div>        


                        </form>
                    </div>
          
            </div>
                </Modal>


  
            </div>
        )
    }
}

export default LoginForm