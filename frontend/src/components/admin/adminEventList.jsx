import {Component} from "react";
import {Button, Col, Row, Table} from "react-bootstrap";
import api from "../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../pagination";


export default class AdminEventList extends Component {
    state = {
        events: [],
        numberOfEvents: '',
        eventsPerPage: '',
        currentPage: 1,
        targetValue: 'all'
    }

    async componentDidMount() {
        const events = await api(`employee-events/get-events`, 'get', '');

        await this.setState({
            events: events.events,
            numberOfEvents: events.numberOfEvents,
            eventsPerPage: events.eventsPerPage
        })
    }

    async onSelectChange(event) {
        let events = '';
        if (event.target.value === 'active') {
            events = await api(`employee-events/get-active-events`, 'get', '');
        } else if (event.target.value === 'previous') {
            events = await api('employee-events/get-previous-events', 'get', '');
        } else {
            events = await api('employee-events/get-events', 'get', '');
        }
        await this.setState({
            events: events.events,
            numberOfEvents: events.numberOfEvents,
            targetValue: event.target.value,
            currentPage: 1
        })
    }

    handlePageChange = async (page) => {
        await this.setState({currentPage: page})
        let events = '';

        if (this.state.targetValue === 'active') {
            events = await api(`employee-events/get-active-events?page=${this.state.currentPage}`, 'get', '');
        } else if (this.state.targetValue === 'previous') {
            events = await api(`employee-events/get-previous-events?page=${this.state.currentPage}`, 'get', '');
        } else {
            events = await api(`employee-events/get-events?page=${this.state.currentPage}`, 'get', '');
        }

        await this.setState({
            events: events.events,
            numberOfEvents: events.numberOfEvents,
        })
    }

    render() {
        return (
            <>
                <Link className="btn btn-primary" to={"add-new-event"}><FontAwesomeIcon icon={faPlus}/> Dodaj novi
                    dogadjaj</Link>
                <br/>
                <br/>
                <Row>
                    <Col xs={3}>
                        <select id="event" className={"form-select"} onChange={event => this.onSelectChange(event)}>
                            <option value={"all"}>Prikaži sve događaje</option>
                            <option value={"active"}>Prikaži aktivne događaje</option>
                            <option value={"previous"}>Prikaži završene događaje</option>
                        </select>
                    </Col>
                    <Col md={{span: 3, offset: 6}}>
                        <i><b>Ukupan broj događaja: {this.state.numberOfEvents}</b></i>
                    </Col>
                </Row>
                <br/>
                <Table hover bordered striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Naziv događaja</th>
                        <th>Kategorija</th>
                        <th>Grad</th>
                        <th>Država</th>
                        <th>Datum objavljivanja</th>
                        <th>Datum održavanja</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events.map(event =>
                        <tr key={event.eventId}>
                            <td>{event.eventId}</td>
                            <td>{event.eventName}</td>
                            <td>{event.category.categoryName}</td>
                            <td>{event.city.cityName}</td>
                            <td>{event.country.countryName}</td>
                            <td>{event.createdAt}</td>
                            <td>{event.eventDate}</td>
                            <td><Button><FontAwesomeIcon icon={faEye}/> Pregledaj</Button></td>
                            <td><Link className="btn btn-warning" to={`edit-event/${event.eventId}`}><FontAwesomeIcon
                                icon={faEdit}/>Izmijeni</Link>
                            </td>
                            <td><Link className="btn btn-danger" to={`delete-event/${event.eventId}`}><FontAwesomeIcon
                                icon={faTrash}/> Obriši</Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <br/>
                <Pagination eventsCount={this.state.numberOfEvents} pageSize={this.state.eventsPerPage}
                            onPageChange={this.handlePageChange} currentPage={this.state.currentPage}/>
            </>
        );
    }
}