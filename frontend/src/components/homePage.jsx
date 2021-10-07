import React from "react";
import api from "../api/api";
import {CardGroup, Col, Row} from "react-bootstrap";
import EventCard from "./eventCard";

export class HomePage extends React.Component {
    state = {
        events: []
    }

    async componentDidMount() {
        const events = await api('http://localhost:3000/user-event/get-newest-events', 'get', '');

        await this.setState({events})
    }

    render() {
        return (
            <Row>
                {this.state.events.map(event => <Col key={event.eventId}><CardGroup><EventCard
                    eventName={event.eventName} description={event.description}
                    eventPhoto={event.eventPhoto}
                    country={event.country.countryName} city={event.city.cityName}
                    eventDate={event.eventDate}/></CardGroup></Col>)}
            </Row>
        );
    }
}