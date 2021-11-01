import {Component} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import api, {apiFile} from "../../../api/api";
import {Redirect} from "react-router-dom";

export default class EditEvent extends Component {
    state = {
        eventId: this.props.match.params.id,
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventPhoto: '',
        country: '',
        city: '',
        cityName: '',
        cities: [],
        isEdited: false,
        address: ''
    }

    async componentDidMount() {
        const event = await api(`employee-events/get-event/${this.state.eventId}`, 'get', '');
        await this.setState({
            eventName: event.eventName,
            eventDescription: event.description,
            eventDate: event.eventDate,
            eventPhoto: event.eventPhoto,
            country: event.country.countryId,
            city: event.city.cityId,
            cityName: event.city.cityName,
            address: event.address
        })

        const cities = await api(`user-place/get-cities/${this.state.country}`, 'get', '');
        this.setState({cities});
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
            formData.append('address', this.state.address);
            formData.append('city', this.state.city);

            const response = await apiFile(`employee-events/edit-event/${this.state.eventId}`, 'put', formData);
            if (response) await this.setState({isEdited: true})
        } catch (e) {
        }
    }


    render() {
        const {state} = this.props.location;
        if (this.state.isEdited) return (<Redirect to={state ? state.from.pathname : '../events'}/>)
        return (
            <div className={'center-content'}>
                <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Header className={'p-3 bg-warning'}>
                            <Card.Title className={'text-md-center'}>
                                <FontAwesomeIcon icon={faEdit}/>Izmijeni događaj
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventName"}>Naziv
                                        događaja</Form.Label>
                                    <Form.Control id={"eventName"} type={"text"} value={this.state.eventName}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventDescription"}>Opis
                                        događaja</Form.Label>
                                    <Form.Control id={"eventDescription"} as={'textarea'} rows={5}
                                                  value={this.state.eventDescription}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label htmlFor={'address'} className={'small fw-bold'}>Adresa</Form.Label>
                                    <Form.Control id={'address'} type={'text'} value={this.state.address}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"city"}>Grad</Form.Label>
                                    <select id={"city"} className={"form-select"} value={this.state.city}
                                            onChange={event => this.onInputChange(event)}>
                                        {this.state.cities.map(city =>
                                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                                        )}
                                    </select>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventDate"}>Datum
                                        događaja</Form.Label>
                                    <Form.Control id={"eventDate"} type={"datetime-local"} value={this.state.eventDate}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} id={"event-photo"}>Fotografija
                                        događaja</Form.Label><br/>
                                    <Form.Control type={"file"} id={"event-photo"}
                                                  onChange={event => this.handleFile(event)}/>
                                </Form.Group>
                                <br/>
                                <div className={'text-md-center'}>
                                    <Button variant={"warning"} className={'fw-bold pe-4 ps-4 p-2'}
                                            onClick={async () => await this.doEdit()}>Sačuvaj izmjene</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        );
    }
}