import React, {Component} from "react";
import api from "../../../api/api";
import {Alert, Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Redirect} from "react-router-dom";

export default class EditTicket extends Component {
    state = {
        ticketId: this.props.match.params.id,
        ticketName: '',
        description: '',
        ticketPrice: '',
        ticketCount: '',
        eventId: '',
        isEdited: false,
        errorMessage: ''
    }

    async componentDidMount() {
        const ticket = await api(`employee-ticket/get-ticket/${this.state.ticketId}`, 'get', '');
        this.setState({
            ticketName: ticket.ticketName,
            description: ticket.description,
            ticketPrice: ticket.ticketPrice,
            ticketCount: ticket.ticketCount,
            eventId: ticket.event.eventId
        });
    }

    handleInputChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        });

        this.setState(newState);
    }

    async doEdit() {
        try {
            const response = await api(`employee-ticket/edit-ticket/${this.state.ticketId}`, 'put', {
                ticketName: this.state.ticketName,
                description: this.state.description,
                ticketPrice: +this.state.ticketPrice,
                ticketCount: +this.state.ticketCount
            });
            if (response) this.setState({isEdited: true});
        } catch (e) {
            this.setState({errorMessage: e.response.data.message});
        }
    }


    render() {
        const {ticketName, isEdited, ticketPrice, ticketCount, description} = this.state;
        const {state} = this.props.location;
        console.log(state.from.pathname);
        if (isEdited) return (<Redirect to={state.from.pathname}/>);

        return (
            <div className={'center-content'}>
                <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Header className={'p-3 bg-warning'}>
                            <Card.Title className={'text-md-center'}>
                                <FontAwesomeIcon icon={faEdit}/> <span
                                className={'fw-bold'}>Promijeni informacije o ulaznici</span>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label htmlFor={"ticketName"} className={"small fw-bold"}>Naziv
                                        ulaznice</Form.Label>
                                    <Form.Control id={"ticketName"} type={"text"} value={ticketName}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label htmlFor={"description"} className={"small fw-bold"}>Opis
                                        ulaznice</Form.Label>
                                    <Form.Control id={"description"} type={"text"} value={description}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label htmlFor={"ticketPrice"} className={"small fw-bold"}>Cijena
                                        ulaznice</Form.Label>
                                    <Form.Control id={'ticketPrice'} type={'text'} value={ticketPrice}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label htmlFor={"ticketCount"} className={"small fw-bold"}>Broj
                                        ulaznica</Form.Label>
                                    <input className={'form-control'} id={'ticketCount'} type={"number"} min={"0"}
                                           value={ticketCount} onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <br/>
                                <div className={'text-md-center'}>
                                    <Button variant={'warning'} className={'fw-bold ps-4 pe-4 p-2'}
                                            onClick={async () => this.doEdit()}>Potvrdi izmjene</Button>
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