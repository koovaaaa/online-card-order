import {Component} from "react";
import api from "../../api/api";
import {Alert, Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faTicketAlt} from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';

export class TicketsPage extends Component {
    state = {
        eventId: this.props.match.params.id,
        tickets: [],
        eventName: '',
        city: '',
        show: false,
        ticketId: '',
        quantity: 1,
        eventPhoto: ''
    }

    async componentDidMount() {
        const tickets = await api(`user-ticket/get-event-tickets/${this.state.eventId}`, 'get', '');
        const event = await api(`user-event/get-event/${this.state.eventId}`, 'get', '');
        await this.setState({
            tickets,
            eventName: event.eventName,
            city: event.city.cityName,
            eventPhoto: event.eventPhoto
        });
    }

    handleShow = (ticketId) => {
        this.setState({show: true, ticketId, quantity: 1});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    addToCart = async () => {
        this.setState({show: false});
        try {
            await api(`user-cart/add-ticket`, 'post', {
                ticket: +this.state.ticketId,
                quantity: +this.state.quantity
            })
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    handleSelect(e) {
        this.setState({quantity: e.target.value});
    }


    render() {
        const {show} = this.state;
        const quantity = _.range(1, 11);

        return (
            <Container>
                <h1 className={"text-md-center fw-bold"}>{this.state.eventName} @ {this.state.city}</h1>
                <br/><br/>
                {this.state.tickets.length ?
                    <Table hover className={"table table-borderless"}>
                        <thead className={"border-bottom"}>
                        <tr>
                            <th></th>
                            <th></th>
                            <th className={"text-md-end"}>Broj ulaznica na stanju</th>
                            <th className={"text-md-end"}>Cijena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tickets.map(ticket => <tr key={ticket.ticket.ticketId}>
                            <td><b>{ticket.ticket.ticketName.toUpperCase()}</b></td>
                            <td className={"text-md-start"}>{ticket.ticket.description}</td>
                            <td className={"text-md-end"}>{ticket.ticket.ticketCount}</td>
                            <td className={"text-md-end"}>{ticket.price}</td>
                            <td className={"text-md-center justify-content-around"}><Button
                                variant={"outline-primary"}
                                onClick={() => this.handleShow(ticket.ticket.ticketId)}><FontAwesomeIcon
                                icon={faShoppingCart}/> Naruči
                                kartu</Button>
                            </td>
                        </tr>)}
                        </tbody>
                    </Table> :
                    <Alert className={'text-md-center fw-bold'} variant={'warning'}>Za ovaj događaj ulaznice još
                        nisu objavljene!</Alert>
                }

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><FontAwesomeIcon icon={faTicketAlt}/> Naruči kartu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={4}>
                                <img className={'w-100'} src={process.env.REACT_APP_API_URL + this.state.eventPhoto}
                                     alt={'ticketPhoto'}/>
                            </Col>
                            <Col md={{offset: 1}} className={'text-align-center'}>
                                <span className={'fw-bold'}>Izaberite količinu:</span>
                                <select className={'text-align-center form-select w-75'}
                                        onChange={event => this.handleSelect(event)}>
                                    {quantity.map(number =>
                                        <option key={number} value={number}>{number}</option>
                                    )}
                                </select>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'danger'} onClick={this.handleClose}>Izađi</Button>
                        <Button variant={'success'} onClick={this.addToCart}>Dodaj u korpu</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}