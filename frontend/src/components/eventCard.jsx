import {Component} from "react";
import {Button, Card} from "react-bootstrap";

export default class EventCard extends Component {
    render() {
        return (
            <Card>
                <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}${this.props.eventPhoto}`}/>
                <Card.Body>
                    <Card.Title>{this.props.eventName}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                    <Button variant="outline-primary">Saznaj više</Button>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>Mjesto: {`${this.props.city} / ${this.props.country}`}</Card.Text>
                    <Card.Text>Datum: {this.props.eventDate}</Card.Text>
                </Card.Footer>
            </Card>
        );
    }
}