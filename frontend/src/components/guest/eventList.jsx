import {Component} from "react";
import EventCard from "./eventCard";
import api from "../../api/api";
import {Alert, CardGroup, Col, Row} from "react-bootstrap";
import Pagination from "../common/pagination";

export default class EventList extends Component {
    state = {
        events: [],
        categories: [],
        countries: [],
        country: '',
        category: '',
        numberOfActiveEvents: '',
        numberOfEventsPerPage: '',
        currentPage: 1
    }

    async componentDidMount() {
        const events = await api('http://localhost:3000/user-event/get-active-events', 'get', '');
        const countries = await api('http://localhost:3000/user-place/get-countries', 'get', '');
        const categories = await api('http://localhost:3000/user-event/get-categories', 'get', '');

        await this.setState({
            events: events.events,
            numberOfActiveEvents: events.eventsCount,
            numberOfEventsPerPage: events.eventsPerPage
        })
        await this.setState({countries})
        await this.setState({categories});
    }

    async onSelectListChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        await this.setState(newState);


        const events = await api(`http://localhost:3000/user-event/get-active-events?${this.state.category ? `category=${this.state.category}` : ''}&${this.state.country ? `country=${this.state.country}` : ''}`, 'get', '');
        await this.setState({
            events: events.events,
            numberOfActiveEvents: events.eventsCount,
            numberOfEventsPerPage: events.eventsPerPage
        })
    }

    handlePageChange = async (page) => {
        await this.setState({currentPage: page});

        const events = await api(`http://localhost:3000/user-event/get-active-events?${this.state.category ? `category=${this.state.category}` : ''}&${this.state.country ? `country=${this.state.country}` : ''}&${this.state.currentPage ? `page=${this.state.currentPage}` : ''}`, 'get', '');
        await this.setState({
            events: events.events,
            numberOfActiveEvents: events.eventsCount,
            numberOfEventsPerPage: events.eventsPerPage
        })
    }

    render() {
        return (
            <>
                <Row>
                    <Col xs={3}>
                        <select id="category" className="form-select small fw-bold"
                                onChange={event => this.onSelectListChange(event)}>
                            <option value={''}>Izaberi kategoriju</option>
                            {this.state.categories.map(category => <option
                                key={category.categoryId}
                                value={category.categoryId}>{category.categoryName}</option>)}
                        </select>
                    </Col>
                    <Col xs={3}>
                        <select id="country" className="form-select small fw-bold"
                                onChange={event => this.onSelectListChange(event)}>
                            <option value={''}>Izaberi državu</option>
                            {this.state.countries.map(country => <option
                                key={country.countryId}
                                value={country.countryId}>{country.countryName}</option>)}
                        </select>
                    </Col>
                </Row>
                <br/>
                <Row xs={1} md={3} className={'g-4'}>
                    {this.state.events.map(event =>
                        <Col key={event.eventId}>
                            <CardGroup>
                                <EventCard eventPhoto={event.eventPhoto}
                                           eventName={event.eventName}
                                           eventDate={event.eventDate}
                                           city={event.city.cityName}
                                           country={event.country.countryName}/>
                            </CardGroup>
                        </Col>
                    )}
                </Row>
                <br/>
                <Pagination eventsCount={this.state.numberOfActiveEvents}
                            pageSize={this.state.numberOfEventsPerPage}
                            onPageChange={this.handlePageChange}
                            currentPage={this.state.currentPage}/>
                <br/>
                <Alert variant={"warning"}
                       className={!this.state.events.length ? '' : 'd-none'}>{'Za izabrani filter ne postoje događaji!'}</Alert>
            </>);
    }
}