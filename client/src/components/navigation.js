import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import AuthServices from '../service/auth-services'


class navigation extends Component {

    constructor(props) {
        super(props)
        this.service = new AuthServices()
    }


    logout = () => {
        this.service.logout()
            .then(x => this.props.setTheUser(null))
    }

    render() {
        if (this.props.userInSession) {
            return (
                <Navbar expand="md" bg="dark" variant="dark" className="justify-content-end navigation">
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    ¡Hola {this.props.userInSession.username}!
                        </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <Link to="/profile">Perfil</Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <Link to="/">Inicio</Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <Link to="/coasters">Montañas rusas</Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <div onClick={this.logout}>Cerrar sesión</div>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
            )
        } else {
            return (
                <Navbar expand="md" bg="dark" variant="dark" className="justify-content-end navigation">
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    ¡Hola invitado!
                        </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <Link to="/">Inicio</Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <Link to="/coasters">Montañas rusas</Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <Link to="/login">Iniciar sesión</Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as="div">
                                    <Link to="/signup">Registrarse</Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
    }
}




export default navigation