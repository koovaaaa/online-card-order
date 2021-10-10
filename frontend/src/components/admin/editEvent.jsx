import {Component} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import api, {apiFile} from "../../api/api";
import {Redirect} from "react-router-dom";

export default class EditEvent extends Component {
    state = {
        eventId: this.props.match.params.id,
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventPhoto: '',
        isEdited: false
    }

    async componentDidMount() {
        const event = await api(`employee-events/get-event/${this.state.eventId}`, 'get', '');
        await this.setState({
            eventName: event.eventName,
            eventDescription: event.description,
            eventDate: event.eventDate,
            eventPhoto: event.eventPhoto,
        })
    }

    async onInputChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        await this.setState(newState);
    }

    async handleFile(event) {
        let file = event.target.files[0];
        await this.setState({eventPhoto: file})
    }

    async doEdit() {
        try {
            const formData = new FormData();
            formData.append('eventName', this.state.eventName);
            formData.append('description', this.state.eventDescription);
            formData.append('eventDate', this.state.eventDate);
            formData.append('eventPhoto', this.state.eventPhoto);

            const response = await apiFile(`employee-events/edit-event/${this.state.eventId}`, 'put', formData);
            if (response) await this.setState({isEdited: true})
        } catch (e) {
        }
    }


    render() {
        if (this.state.isEdited) return (<Redirect to={'../events'}/>)
        return (
            <Container>
                <Col md={{span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faEdit}/>Izmijeni događaj
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventName"}>Naziv
                                        događaja</Form.Label>
                                    <Form.Control id={"eventName"} type={"text"} value={this.state.eventName}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventDescription"}>Opis
                                        događaja</Form.Label>
                                    <Form.Control id={"eventDescription"} type={"text"}
                                                  value={this.state.eventDescription}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventDate"}>Datum
                                        događaja</Form.Label>
                                    <Form.Control id={"eventDate"} type={"date"} value={this.state.eventDate}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={"small fw-bold"} id={"event-photo"}>Fotografija
                                        događaja</Form.Label><br/>
                                    <Form.Control type={"file"} id={"event-photo"}
                                                  onChange={event => this.handleFile(event)}/>
                                </Form.Group>
                                <br/>
                                <Button variant={"primary"}
                                        onClick={async () => await this.doEdit()}>Potvrdi</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}