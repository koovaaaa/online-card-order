import {Component} from "react";
import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import api from "../../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../common/pagination";


export default class AdminEmployeeEventList extends Component {
    state = {
        events: [],
        numberOfEvents: '',
        eventsPerPage: '',
        currentPage: 1,
        targetValue: 'all',
        show: false,
        eventId: ''
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = (eventId) => {
        this.setState({show: true, eventId});
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
                <Table hover borderless striped>
                    <thead className={'border-bottom'}>
                    <tr>
                        <th className={"text-md-center"}>#</th>
                        <th className={"text-md-center"}>Naziv događaja</th>
                        <th className={"text-md-center"}>Kategorija</th>
                        <th className={"text-md-center"}>Grad</th>
                        <th className={"text-md-center"}>Država</th>
                        <th className={"text-md-center"}>Datum i vrijeme</th>
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
                            <td>{event.eventDate}</td>
                            <td className={"text-md-center"}><Link className="btn btn-primary"
                                                                   to={`/employee/event/${event.eventId}`}><FontAwesomeIcon
                                icon={faEye}/> Pregledaj</Link>
                            </td>
                            <td className={"text-md-center"}><Link className="btn btn-warning"
                                                                   to={`edit-event/${event.eventId}`}><FontAwesomeIcon
                                icon={faEdit}/>Izmijeni</Link>
                            </td>
                            <td className={"text-md-center"}><Button className="btn btn-danger"
                                                                     onClick={() => this.handleShow(event.eventId)}><FontAwesomeIcon
                                icon={faTrash}/> Obriši
                            </Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <br/>
                <Pagination eventsCount={this.state.numberOfEvents} pageSize={this.state.eventsPerPage}
                            onPageChange={this.handlePageChange} currentPage={this.state.currentPage}/>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Izbriši događaj</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className={'fw-bold'}> Da li ste sigurni da želite da izbrišete događaj?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'success'} onClick={this.handleClose}>Izađi</Button>
                        <Link className={'btn btn-danger'} to={`delete-event/${this.state.eventId}`}> Potvrdi
                            akciju</Link>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}