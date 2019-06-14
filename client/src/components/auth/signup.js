import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'

class Signup extends Component {

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
        this.services.signup(username, password)
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
                    <div>
                        <h1>Sign Up</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" placeholder="User Name"/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="signup-link">Sign Up</button>
                        </form>
                    </div>
            </div>
        )
    }

}

export default Signup

