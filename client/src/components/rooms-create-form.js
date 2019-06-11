import React, { Component } from 'react'
import CoasterServices from '../service/coaster-services'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'


class CreateForm extends Component {

    constructor() {
        super()
        this.state = {
            coaster: {
                title: '',
                description: '',
                length: '',
                inversions: '',
                imageUrl: ''
            },
            show: false
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.services = new CoasterServices()
    }

    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })

    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            coaster: {
                ...this.state.coaster,
                [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.services.postCoaster(this.state.coaster)
            .then(x => window.location.href = "/coasters")
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.services.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    coaster: {
                        ...this.state.coaster, imageUrl: response.secure_url
                    }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
          <div>
          
          <button className='button-login' onClick={this.handleShow}>LOG IN</button>

          <div className="modalcontainer" >
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <div className='modalbody'>
                        <form onSubmit={this.handleSubmit}>
                            
                                <input onChange={this.handlechange} value={this.state.coaster.title} type="text" className="form-control" id="title" name="title" placeHolder = "Chose a name"/>
                   
                                <input onChange={this.handlechange} value={this.state.coaster.description} type="text" className="form-control" id="description" name="description" placeHolder = "Description"/>
      
                                <input onChange={this.handlechange} value={this.state.coaster.length} type="number" className="form-control" id="length" name="length" placeHolder = "Chose tags"/>
                                <div className="location-radio">

                                <input onChange={this.handlechange} value={this.state.coaster.length} type="radio" className="form-control radio" id="length" name="length"/>
                                <label>Don't share my location</label>
                            
                                </div>
 
                      
                            <Link type="submit" className="send-form-button">Enviar</Link>
                        </form>
                    </div>
                </Modal>


            </div>
            </div>
        )
    }
}

export default Create