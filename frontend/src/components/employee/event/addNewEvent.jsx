import {Component} from "react";
import {Alert, Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import api, {apiFile} from "../../../api/api";
import {Redirect} from "react-router-dom";

export default class AddNewEvent extends Component {
    state = {
        categories: [],
        countries: [],
        cities: [],
        eventName: '',
        eventDescription: '',
        category: '',
        eventDate: '',
        city: '',
        country: '',
        eventPhoto: null,
        errorMessage: '',
        isAdded: false,
        address: ''
    }

    async componentDidMount() {
        const categories = await api('user-event/get-categories', 'get', '');
        const countries = await api('user-place/get-countries', 'get', '');
        await this.setState({categories, countries})
    }

    async handleCountryChange(event) {
        const cities = await api(`user-place/get-cities/${event.target.value}`, 'get', null);
        await this.setState({cities});
        await this.setState({country: event.target.value});
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

    async doUpload() {
        try {
            const formData = new FormData();
            formData.append('eventName', this.state.eventName);
            formData.append('description', this.state.eventDescription);
            formData.append('category', this.state.category);
            formData.append('eventDate', this.state.eventDate);
            formData.append('address', this.state.address);
            formData.append('city', this.state.city);
            formData.append('country', this.state.country);
            formData.append('eventPhoto', this.state.eventPhoto)
            const response = await apiFile('employee-events/add-event', 'post', formData);
            if (response) this.setState({isAdded: true})
        } catch (e) {
            await this.setState({errorMessage: e.response.data.message})
        }
    }

    render() {
        if (this.state.isAdded) return (<Redirect to={'events'}/>);

        return (
            <div className={'center-content'}>
                <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Header className={'p-3 bg-primary text-white'}>
                            <Card.Title className={'text-md-center'}>
                                <FontAwesomeIcon icon={faFolderPlus}/> Dodaj novi događaj
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventName"}>Naziv
                                        događaja</Form.Label>
                                    <Form.Control id={"eventName"} type={"text"} placeholder={"Unesite naziv događaja"}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventDescription"}>Opis
                                        događaja</Form.Label>
                                    <Form.Control id={"eventDescription"} as={'textarea'}
                                                  placeholder={"Unesite opis događaja"}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"eventDate"}>Datum
                                        događaja</Form.Label>
                                    <Form.Control id={"eventDate"} type={"datetime-local"}
                                                  placeholder={"Unesite datum"}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"category"}>Kategorija</Form.Label>
                                    <select id="category" className={"form-select"}
                                            onChange={event => this.onInputChange(event)}>
                                        <option value={''}>Izaberi kategoriju</option>
                                        {this.state.categories.map(category =>
                                            <option key={category.categoryId}
                                                    value={category.categoryId}>{category.categoryName}</option>
                                        )}
                                    </select>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label htmlFor={'address'} className={'small fw-bold'}>Adresa</Form.Label>
                                    <Form.Control id={'address'} type={'text'} placeholder={'Unesi adresu'}
                                                  onChange={event => this.onInputChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"}
                                                htmlFor={"select-country"}>Država</Form.Label>
                                    <select id="select-country" className={"form-select"}
                                            onChange={event => this.handleCountryChange(event)}>
                                        <option value={''}>Izaberi državu</option>
                                        {this.state.countries.map(country =>
                                            <option key={country.countryId}
                                                    value={country.countryId}>{country.countryName}</option>
                                        )}
                                    </select>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"city"}>Grad</Form.Label>
                                    <select id="city" className={"form-select"}
                                            onChange={event => this.onInputChange(event)}>
                                        <option value={''}>Izaberi grad</option>
                                        {this.state.cities.map(city =>
                                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                                        )}
                                    </select>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"event-photo"}>Fotografija
                                        događaja</Form.Label><br/>
                                    <Form.Control id="event-photo" type={"file"}
                                                  onChange={event => this.handleFile(event)}/>
                                </Form.Group>
                                <br/>
                                <div className={'text-md-center'}>
                                    <Button variant={"primary"} className={'fw-bold p-2 pe-4 ps-4'}
                                            onClick={async () => await this.doUpload()}>Potvrdi</Button>
                                </div>
                            </Form>
                            <br/>
                            <Alert variant="danger"
                                   className={this.state.errorMessage ? 'small fw-bold text-md-center' : 'd-none'}>
                                {this.state.errorMessage}
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        );
    }
}