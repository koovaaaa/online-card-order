import {Component} from "react";
import {Button, Col, Container, Image, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
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
        tickets: []
    }

    async componentDidMount() {
        const event = await api(`employee-events/get-event/${this.state.eventId}`, 'get', '');
        const tickets = await api(`employee-ticket/get-tickets/${this.state.eventId}`, 'get', '')
        event.createdAt = moment(event.createdAt).format('DD/MM/YYYY u HH:MM');
        event.eventDate = Date.parse(event.eventDate);
        event.eventDate = moment(event.eventDate).format('DD/MM/YYYY u HH:MM');
        event.changedAt = moment(event.changedAt).format('DD/MM/YYYY u HH:MM');
        this.setState({
            event,
            tickets,
            countryName: event.country.countryName,
            categoryName: event.category.categoryName,
            cityName: event.city.cityName,
            createdBy: event.createdBy.username,
            changedBy: event.changedBy.username
        });
    }


    render() {
        const {eventId, event, cityName, categoryName, countryName, changedBy, createdBy, tickets} = this.state;

        return (
            <Container>
                <Row>
                    <Col xs={6}>
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
                                    <td className={'fw-bold'} width={'23%'}>Naziv događaja</td>
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
                                    <td>{event.createdAt} by <span className={'fw-bold'}>{createdBy}</span></td>
                                </tr>
                                <tr>
                                    <td className={'fw-bold'}>Događaj editovan</td>
                                    <td>{event.changedAt} by <span className={'fw-bold'}>{changedBy}</span></td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <Link className={"btn btn-primary"} to={'/'}><FontAwesomeIcon icon={faPlus}/> Dodaj novu
                            ulaznicu</Link><br/><br/>
                        <div>
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
                                    <tr>
                                        <td>{ticket.ticketName}</td>
                                        <td className={"text-md-end"}>{ticket.ticketCount}</td>
                                        <td className={"text-md-end"}>{ticket.ticketPrice} BAM</td>
                                        <td className={'text-md-end'}><Button variant={'warning'}><FontAwesomeIcon
                                            icon={faEdit}/></Button></td>
                                        <td className={'text-md-center'}><Button variant={'danger'}><FontAwesomeIcon
                                            icon={faTimes}/></Button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}