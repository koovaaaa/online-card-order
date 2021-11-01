import React, {Component} from "react";
import {Alert, Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import api from "../../../api/api";
import {Redirect} from "react-router-dom";

export default class AddNewTicket extends Component {
    state = {
        eventId: this.props.match.params.id,
        ticketName: '',
        description: '',
        ticketPrice: '',
        ticketCount: '',
        isAdded: false,
        errorMessage: ''
    }

    handleInputChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        });

        this.setState(newState);
    }

    async addNewEvent() {
        const {eventId, ticketName, description, ticketPrice, ticketCount} = this.state
        try {
            const response = await api(`employee-ticket/add-ticket`, 'post', {
                ticketName,
                description,
                ticketPrice: +ticketPrice,
                ticketCount: +ticketCount,
                event: eventId
            })

            if (response) this.setState({isAdded: true})
        } catch (e) {
            this.setState({errorMessage: e.response.data.message});
        }
    }

    render() {
        const {eventId, isAdded} = this.state
        if (isAdded) return (<Redirect to={`../${eventId}`}/>);
        return (
            <div className={'center-content'}>
                <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Header className={'p-3 bg-primary text-white'}>
                            <Card.Title className={'text-md-center'}>
                                <FontAwesomeIcon icon={faFolderPlus}/> <span
                                className={'fw-bold'}>Dodaj novu ulaznicu</span>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className={'text-md-center fw-bold small'}>
                                    <Form.Label htmlFor={'ticketName'}>Naziv ulaznice</Form.Label>
                                    <Form.Control id={'ticketName'} type={'text'}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center fw-bold small'}>
                                    <Form.Label htmlFor={'description'}>Opis ulaznice</Form.Label>
                                    <Form.Control id={'description'} type={'text'}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center fw-bold small'}>
                                    <Form.Label htmlFor={'ticketPrice'}>Cijena ulaznice</Form.Label>
                                    <Form.Control id={'ticketPrice'} type={'text'}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center fw-bold small'}>
                                    <Form.Label htmlFor={'ticketCount'}>Broj ulaznica</Form.Label>
                                    <input className={'form-control'} type={'number'} min={0} id={'ticketCount'}
                                           onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <br/>
                                <div className={'text-md-center'}>
                                    <Button variant={'primary fw-bold'} className={'p-2 pe-4 ps-4'}
                                            onClick={async () => await this.addNewEvent()}>Potvrdi</Button>
                                </div>
                            </Form>
                            <br/>
                            <Alert variant="danger" className={this.state.errorMessage ? 'fw-bold' : 'd-none'}>
                                {this.state.errorMessage}
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        );
    }
}