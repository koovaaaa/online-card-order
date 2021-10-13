import React, {Component} from "react";
import api from "../../api/api";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Redirect} from "react-router-dom";

export default class UserProfile extends Component {
    state = {
        countries: [],
        cities: [],
        name: '',
        surname: '',
        username: '',
        email: '',
        address: '',
        contactPhone: '',
        country: '',
        role: '',
        city: '',
    }

    async componentDidMount() {
        try {
            const countries = await api('user-place/get-countries', 'get', '');
            const cities = await api('user-place/get-cities', 'get', '');
            const user = await api('user-profile/my-profile', 'get', '');
            await this.setState({
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                address: user.address,
                contactPhone: user.contactPhone,
                country: user.country.countryId,
                city: user.city.cityId,
                role: user.role,
                countries,
                cities,
                isEdited: false,
                errorMessage: ''
            });
        } catch (e) {

        }
    }

    async handleInputChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        await this.setState(newState);
    }

    async onCountryChange(event) {
        const countryId = event.target.value;
        await this.setState({country: countryId});
        const cities = await api(`user-place/get-cities/${countryId}`, 'get', '');
        await this.setState({cities});
    }

    async doEdit() {
        try {
            const response = await api('user-profile/edit-profile', 'put', {
                name: this.state.name,
                surname: this.state.surname,
                username: this.state.username,
                email: this.state.email,
                contactPhone: this.state.contactPhone,
                address: this.state.address,
                country: this.state.country,
                city: this.state.city
            })

            if (response) await this.setState({isEdited: true})
        } catch (e) {
            await this.setState({errorMessage: e.response.data.message})
        }
    }

    render() {
        if (this.state.isEdited) return (<Redirect to={this.state.role === 'Korisnik' ? '/' : '/employee'}/>);

        return (
            <Container>
                <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faUser}/> Moj profil
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor={"name"} className={"small fw-bold"}>Ime</Form.Label>
                                    <Form.Control id={"name"} type={"text"} value={this.state.name}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor={"surname"} className={"small fw-bold"}>Prezime</Form.Label>
                                    <Form.Control type={"text"} id={"surname"} value={this.state.surname}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor={"username"} className={"small fw-bold"}>Korisničko
                                        ime</Form.Label>
                                    <Form.Control type={"text"} id={"username"} value={this.state.username}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor={"email"} className={"small fw-bold"}>Email adresa</Form.Label>
                                    <Form.Control type={"email"} id={"email"} value={this.state.email}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor={"contactPhone"} className={"small fw-bold"}>Broj
                                        telefona</Form.Label>
                                    <Form.Control type={"text"} id={"contactPhone"} value={this.state.contactPhone}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor={"address"} className={"small fw-bold"}>Adresa
                                        stanovanja</Form.Label>
                                    <Form.Control type={"text"} id={"address"} value={this.state.address}
                                                  onChange={event => this.handleInputChange(event)}/>
                                </Form.Group>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor={"country"}
                                                        className={"small fw-bold"}>Država</Form.Label>
                                            <select value={this.state.country}
                                                    className={"form-select"} id={"country"}
                                                    onChange={event => this.onCountryChange(event)}>
                                                {this.state.countries.map(country =>
                                                    <option key={country.countryId}
                                                            value={country.countryId}>{country.countryName}</option>
                                                )}
                                            </select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor={"city"}
                                                        className={"small fw-bold"}>Grad</Form.Label>
                                            <select value={this.state.city} className={"form-select"}
                                                    id={"city"} onChange={event => this.handleInputChange(event)}>
                                                {this.state.cities.map(city =>
                                                    <option key={city.cityId}
                                                            value={city.cityId}>{city.cityName}</option>
                                                )}
                                            </select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br/>
                                <Button variant={"primary"} onClick={async () => await this.doEdit()}>Spasi
                                    promjene</Button>
                            </Form>
                            <br/>
                            <Alert variant="danger" className={this.state.errorMessage ? '' : 'd-none'}>
                                {this.state.errorMessage}
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}