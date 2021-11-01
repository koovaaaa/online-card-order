import {Component} from "react";
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import api from "../../../api/api";
import * as moment from "moment";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft, faEdit} from "@fortawesome/free-solid-svg-icons";

export default class TicketPage extends Component {
    state = {
        ticketId: this.props.match.params.id,
        ticketName: '',
        description: '',
        ticketPrice: '',
        ticketCount: '',
        createdAt: '',
        createdBy: '',
        editedAt: '',
        editedBy: '',
        eventName: '',
        eventId: ''
    }

    async componentDidMount() {
        const ticket = await api(`employee-ticket/get-ticket/${this.state.ticketId}`, 'get', '');
        ticket.createdAt = moment(ticket.createdAt).format('DD/MM/YYYY u HH:mm');

        if (ticket.editedAt) {
            ticket.editedAt = moment(ticket.editedAt).format('DD/MM/YYYY u HH:mm');
            this.setState({editedAt: ticket.editedAt, editedBy: ticket.editedBy.username});
        }

        this.setState({
            ticketName: ticket.ticketName,
            description: ticket.description,
            ticketPrice: ticket.ticketPrice,
            ticketCount: ticket.ticketCount,
            createdAt: ticket.createdAt,
            createdBy: ticket.createdBy.username,
            eventName: ticket.event.eventName,
            eventId: ticket.event.eventId
        })
    }


    render() {
        const {
            ticketCount,
            createdAt,
            ticketName,
            createdBy,
            ticketPrice,
            editedAt,
            editedBy,
            eventName,
            description,
            ticketId,
            eventId
        } = this.state;
        const {state} = this.props.location;
        return (
            <Container>
                <Row>
                    <div>
                        <Link className={'btn btn-danger m-1'}
                              to={state ? state.from.pathname : `../${eventId}`}><FontAwesomeIcon
                            icon={faAngleDoubleLeft}/> Nazad</Link>
                        <Link className={'btn btn-warning'} to={{
                            pathname: `../edit-ticket/${ticketId}`,
                            state: {from: this.props.location}
                        }}><FontAwesomeIcon icon={faEdit}/> Izmijeni</Link>
                    </div>
                    <br/><br/>
                    <Col xs={6}>
                        <Card className={'mt-3'}>
                            <Card.Body>
                                <h4 className={'text-md-center'}>Informacije o ulaznici</h4>
                                <Table hover className={"table"}>
                                    <tbody>
                                    <tr>
                                        <td className={'fw-bold'}>Naziv ulaznice</td>
                                        <td>{ticketName}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Opis ulaznice</td>
                                        <td>{description}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Događaj</td>
                                        <td>{eventName}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Cijena ulaznice</td>
                                        <td>{ticketPrice + ' BAM'}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Dostupne ulaznice</td>
                                        <td>{ticketCount}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card className={'mt-3'}>
                            <Card.Body>
                                <h4 className={'text-md-center'}>Informacije o akcijama</h4>
                                <Table hover className={"table"}>
                                    <tbody>
                                    <tr>
                                        <td className={'fw-bold'}>Ulaznica dodata</td>
                                        <td>{createdAt}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Ulaznicu dodao</td>
                                        <td>{createdBy}</td>
                                    </tr>
                                    {editedAt ?
                                        <>
                                            <tr>
                                                <td className={'fw-bold'}>Ulaznica izmijenjena</td>
                                                <td>{editedAt}</td>
                                            </tr>
                                            <tr>
                                                <td className={'fw-bold'}>Ulaznicu izmijenio</td>
                                                <td>{editedBy}</td>
                                            </tr>
                                        </>
                                        : ''}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}