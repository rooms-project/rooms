import React, { Component } from 'react'
import CoasterService from '../service/coaster-services'

import { Link } from 'react-router-dom'



class CoasterDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { coaster: {} }
        this.services = new CoasterService()
    }


    componentDidMount() {

        this.services.getOneCoaster(this.props.match.params.id)
            .then(theCoaster => this.setState({ coaster: theCoaster }))
    }

    render() {
        return (
            <div className="container coaster-detail">

                <h1>{this.state.coaster.title}</h1>

                <div className="row">

                    <div className="col-md-8">
                        <img src={this.state.coaster.imageUrl} alt={this.state.coaster.title}></img>
                    </div>
                    <div className="col-md-4">
                        <h5>Descripción</h5>
                        <p>{this.state.coaster.description}</p>

                        <h5>Longitud</h5>
                        <p>{this.state.coaster.length}</p>

                        <h5>Inversiones</h5>
                        <p>{this.state.coaster.inversions}</p>

                        <Link to={'/coasters'} className="btn btn-outline-dark">Volver</Link>

                    </div>
                </div>
            </div>


        )
    }
}

export default CoasterDetails