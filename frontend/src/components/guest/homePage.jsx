import React from "react";
import api from "../../api/api";
import {Carousel} from "react-bootstrap";
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

    render() {
        const {events, index} = this.state;
        return (

            <Carousel fade activeIndex={index} onSelect={this.handleSelect}>
                {events.map(event =>
                    <Carousel.Item key={event.eventId}>
                        <Link to={`event/${event.eventId}`}>
                            <img
                                className="d-block w-100"
                                src={process.env.REACT_APP_API_URL + event.eventPhoto}
                                alt="First slide"
                            />
                            <Carousel.Caption
                                className={' border-3 rounded border-radius-2  carousel-caption '}>
                                <h2>{event.eventName}</h2>
                                <h5 className={'fw-bold'}>{event.description}</h5>
                                <h4 className={'fw-bold'}>{event.eventDate}</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                )}
            </Carousel>


        );
    }
}