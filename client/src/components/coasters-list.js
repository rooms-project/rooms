import React, { Component } from 'react'
import CoasterServices from '../service/coaster-services'
import CoasterCard from './coaster-card'
import CoasterForm from './coaster-form'

class CoastersList extends Component {

    constructor(props) {
        super(props)
        this.state = { coasters: [] }
        this.services = new CoasterServices()
    }


    componentDidMount() {
        this.services.getAllCoasters()
            .then(allCoasters => this.setState({ coasters: allCoasters }))
    }


    render() {
        return (

            <div className="container">

                <h1>Listado de montañas rusas</h1>

                {this.props.userInSession ? <CoasterForm /> : null}


                <div className="row coaster-list">

                    {this.state.coasters.map((theCoaster, idx) => <CoasterCard key={idx} {...theCoaster} />)}

                </div>

            </div>
        )
    }
}

export default CoastersList