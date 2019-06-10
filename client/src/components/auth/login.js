import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'

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
    }

    render() {
        return (
            <div className="container">

                <div className="row">

                    <div className="col-md-4">
                        <h1>Iniciar sesión</h1>
                    </div>

                    <div className="col-md-8">

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Usuario</label>
                                <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" />
                            </div>
                            <button type="submit" className="btn btn-dark">¡Acceder</button>
                        </form>
                    </div>

                </div>

            </div>
        )
    }

}

export default Login