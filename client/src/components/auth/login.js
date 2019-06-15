import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'
import { Link } from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '' }
        this.services = new AuthServices()
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {

        e.preventDefault()
        const { username, password } = this.state
        this.services.login(username, password)
            .then(response => {
                this.setState({ username: '', password: '' })
                this.props.setTheUser(response)
            })
            .catch(error => console.log(error.response.data.message))
            window.location.href = `/map`
    }

    render() {
        return (
            <div className="login-form">

                <div >

                 

                    <div >
                        <h1>Log In</h1>
                        <form onSubmit={this.handleSubmit} action="/map">
                           
                             
                                <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" placeholder="User Name"/>
                         
                       
                                <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" placeholder="Password"/>
            
                            <button type="submit" >Log In</button>

                            <div className="login-link">
                                 <p>Don't have an account yet ?</p>
                                 <Link class="signup-link" to="/signup">Sign Up</Link>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        )
    }

}

export default Login