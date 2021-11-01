import React from "react";
import api from "../../api/api";
import {Carousel, Col, Container, FormText, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export class HomePage extends React.Component {
    state = {
        events: [],
        index: 1
    }

    async componentDidMount() {
        const events = await api('http://localhost:3000/user-event/get-newest-events', 'get', '');

        await this.setState({events: events.events})
    }

    handleSelect = (selectedIndex) => {
        this.setState({index: selectedIndex});
    };

    imageClicked(event) {
        this.handleSelect(+event.target.id);
    }

    checkIndex(index) {
        return index === this.state.index;
    }

    render() {
        const {events, index} = this.state;
        return (
            <div className={'mt-5'}>
                <Row>
                    <Col xs={10}>
                        <Carousel interval={3000} fade activeIndex={index} onSelect={this.handleSelect}>
                            {events.map(event =>
                                <Carousel.Item key={event.eventId}>
                                    <Link to={`event/${event.eventId}`}>
                                        <img
                                            className="w-100 rounded"
                                            height={'615px'}
                                            src={process.env.REACT_APP_API_URL + event.eventPhoto}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption
                                            className={' border-3 rounded border-radius-2  carousel-caption '}>
                                            <h2>{event.eventName}</h2>
                                            <h3>{event.address}, {event.city.cityName}</h3>
                                            <h4 className={'fw-bold'}>{event.eventDate}</h4>
                                        </Carousel.Caption>
                                    </Link>
                                </Carousel.Item>
                            )}
                        </Carousel>
                        <FormText className={'small fw-bold'}><i>Napomena: Na početnoj stranici
                            prikazano je
                            pet narednih događaja! Listu svih događaja možete pogledati
                            <Link to={'events'} className={'text-decoration-none'}> ovdje!</Link></i></FormText>
                    </Col>
                    <Col>
                        {events.map((event, index) =>
                            <Container key={event.eventId}>
                                <img
                                    src={process.env.REACT_APP_API_URL + event.eventPhoto}
                                    className={'w-100 rounded border-danger'} height={'105px'}
                                    id={index}
                                    border={this.checkIndex(index) ? '4px ' : ''}
                                    onClick={event => this.imageClicked(event)}
                                    alt={'eventPhoto'}
                                />
                                <br/><br/>
                            </Container>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}