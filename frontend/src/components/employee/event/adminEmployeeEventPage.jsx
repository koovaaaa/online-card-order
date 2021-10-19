import {Component} from "react";
import {Alert, Button, Col, Container, Image, Modal, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft, faEdit, faEye, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import api from "../../../api/api";
import * as moment from 'moment';

export default class AdminEmployeeEventPage extends Component {
    state = {
        eventId: this.props.match.params.id,
        event: [],
        countryName: '',
        categoryName: '',
        cityName: '',
        createdBy: '',
        changedBy: '',
        tickets: [],
        show: false,
        ticketId: '',
        changedAt: ''
    }

    async componentDidMount() {
        const event = await api(`employee-events/get-event/${this.state.eventId}`, 'get', '');
        const tickets = await api(`employee-ticket/get-tickets/${this.state.eventId}`, 'get', '')
        event.createdAt = moment(event.createdAt).format('DD/MM/YYYY u HH:mm');
        event.eventDate = Date.parse(event.eventDate);
        event.eventDate = moment(event.eventDate).format('DD/MM/YYYY u HH:mm');

        if (event.changedAt) {
            event.changedAt = moment(event.changedAt).format('DD/MM/YYYY u HH:mm');
            this.setState({changedAt: event.changedAt, changedBy: event.changedBy.username})
        }

        this.setState({
            event,
            tickets,
            countryName: event.country.countryName,
            categoryName: event.category.categoryName,
            cityName: event.city.cityName,
            createdBy: event.createdBy.username,
        });
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = (ticketId) => {
        this.setState({show: true, ticketId});
    }

    render() {
        const {
            eventId,
            event,
            cityName,
            categoryName,
            countryName,
            changedBy,
            createdBy,
            tickets,
            show,
            ticketId,
            changedAt
        } = this.state;


        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <Link className={'btn btn-danger m-1'} to={'../events'}><FontAwesomeIcon
                            icon={faAngleDoubleLeft}/> Nazad</Link>
                        <Link className={"btn btn-warning"} to={{
                            pathname: `../edit-event/${eventId}`,
                            state: {from: this.props.location}
                        }}><FontAwesomeIcon
                            icon={faEdit}/> Izmijeni</Link>
                        <br/><br/>
                        <div>
                            <Image className={"img-fluid rounded shadow-2-strong"}
                                   src={event.eventPhoto ? process.env.REACT_APP_API_URL + event.eventPhoto : ''}/>
                            <Table hover className={"table"}>
                                <tbody>
                                <tr>
                                    <td className={'fw-bold'} width={'24%'}>Naziv događaja</td>
                                    <td>{event.eventName}</td>
                                </tr>
                                <tr>
                                    <td className={'fw-bold'}>Opis događaja</td>
                                    <td className={'small'}>{event.description}</td>
                                </tr>
                                <tr>
                                    <td className={'fw-bold'}>Kategorija</td>
                                    <td>{categoryName}</td>
                                </tr>
                                <tr>
                                    <td className={'fw-bold'}>Lokacija</td>
                                    <td>{cityName} / {countryName}</td>
                                </tr>
                                <tr>
                                    <td className={'fw-bold'}>Datum i vrijeme</td>
                                    <td>{event.eventDate}</td>
                                </tr>
                                <tr>
                                    <td className={'fw-bold'}>Događaj kreiran</td>
                                    <td>{event.createdAt} </td>
                                </tr>
                                <tr>
                                    <td className={'fw-bold'}>Događaj kreirao</td>
                                    <td>{createdBy}</td>
                                </tr>
                                {changedAt ?
                                    <>
                                        <tr>
                                            <td className={'fw-bold'}>Događaj izmjenjen</td>
                                            <td>{changedAt}</td>
                                        </tr>
                                        <tr>
                                            <td className={'fw-bold'}>Događaj izmjenio</td>
                                            <td>{changedBy}</td>
                                        </tr>
                                    </> : ''
                                }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <Link className={"btn btn-primary"}
                              to={`/employee/event/${eventId}/add-new-ticket`}><FontAwesomeIcon
                            icon={faPlus}/> Dodaj novu
                            ulaznicu</Link><br/><br/>
                        <div>
                            {tickets.length ?
                                <Table hover borderless className={"table "}>
                                    <thead>
                                    <tr className={"border-bottom"}>
                                        <th></th>
                                        <th className={"text-md-end"}>Stanje ulaznica</th>
                                        <th className={"text-md-end"}>Cijena</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tickets.map(ticket =>
                                        <tr key={ticket.ticketId}>
                                            <td>{ticket.ticketName}</td>
                                            <td className={"text-md-end"}>{ticket.ticketCount}</td>
                                            <td className={"text-md-end"}>{ticket.ticketPrice} BAM</td>
                                            <td className={"text-md-end"}><Link className={'btn btn-primary'}
                                                                                to={{
                                                                                    pathname: `view-ticket/${ticket.ticketId}`,
                                                                                    state: {from: this.props.location}
                                                                                }}><FontAwesomeIcon
                                                icon={faEye}/></Link></td>
                                            <td className={'text-md-center'}><Link to={{
                                                pathname: `edit-ticket/${ticket.ticketId}`,
                                                state: {from: this.props.location}
                                            }}
                                                                                   className={'btn btn-warning'}><FontAwesomeIcon
                                                icon={faEdit}/></Link></td>
                                            <td className={'text-md-start'}><Button variant={'danger'}
                                                                                    onClick={() => this.handleShow(ticket.ticketId)}><FontAwesomeIcon
                                                icon={faTimes}/></Button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table> :
                                <Alert className={'fw-bold text-md-center'} variant={'warning'}>Za ovaj događaj ulaznice
                                    još nisu objavljene!</Alert>
                            }
                        </div>
                    </Col>
                </Row>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Izbriši ulaznicu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className={'fw-bold'}> Da li ste sigurni da želite da izbrišete ulaznicu?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'success'} onClick={this.handleClose}>Izađi</Button>
                        <Link className={'btn btn-danger'} to={{
                            pathname: `${eventId}/delete-ticket/${ticketId}`,
                            state: {from: this.props.location}
                        }}> Potvrdi
                            akciju</Link>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}