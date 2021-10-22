import {Component} from "react";
import {Card} from "react-bootstrap";
import '../../assets/css/eventCard.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";

export default class EventCard extends Component {
    render() {
        return (
            <Card>
                <Link to={`event/${this.props.eventId}`}><Card.Img className={"card-img-top"} variant="top"
                                                                   src={`${process.env.REACT_APP_API_URL}${this.props.eventPhoto}`}/></Link>
                <Card.Body>
                    <Card.Title>{this.props.eventName}</Card.Title>
                    <Link className={"btn btn-outline-primary"} to={`event/${this.props.eventId}`}> Saznaj više</Link>
                </Card.Body>
                <Card.Footer>
                    <Card.Text><FontAwesomeIcon
                        icon={faMapMarkerAlt}/> Mjesto: {`${this.props.city} / ${this.props.country}`}</Card.Text>
                    <Card.Text><FontAwesomeIcon icon={faCalendarDay}/> Datum: {this.props.eventDate}</Card.Text>
                </Card.Footer>
            </Card>
        );
    }
}