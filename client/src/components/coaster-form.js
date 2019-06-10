import React, { Component } from 'react'
import CoasterServices from '../service/coaster-services'
import Modal from 'react-bootstrap/Modal'


class CoasterForm extends Component {

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
            <div className="" >

                <button className="btn btn-dark" onClick={this.handleShow}>Nueva montaña rusa</button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nueva montaña rusa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input onChange={this.handlechange} value={this.state.coaster.title} type="text" className="form-control" id="title" name="title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <input onChange={this.handlechange} value={this.state.coaster.description} type="text" className="form-control" id="description" name="description" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="length">Longitud</label>
                                <input onChange={this.handlechange} value={this.state.coaster.length} type="number" className="form-control" id="length" name="length" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inversions">Inversiones</label>
                                <input onChange={this.handlechange} value={this.state.coaster.inversions} type="number" className="form-control" id="inversions" name="inversions" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imageUrl">URL imagen</label>
                                <input onChange={this.handleFileUpload} type="file" className="form-control" id="imageUrl" name="imageUrl" />
                            </div>
                            <button type="submit" className="btn btn-dark">Enviar</button>
                        </form>
                    </Modal.Body>
                </Modal>


            </div>
        )
    }
}

export default CoasterForm