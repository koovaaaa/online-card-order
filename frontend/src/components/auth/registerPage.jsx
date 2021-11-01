import React, {Component} from "react";
import {Alert, Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import api, {getCurrentUser, getToken} from "../../api/api";
import {Link, Redirect} from "react-router-dom";

export default class RegisterPage extends Component {
    state = {
        countries: [],
        cities: [],
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        country: '',
        city: '',
        message: '',
        errorMessage: '',
        isLogged: false
    }

    async componentDidMount() {
        const countries = await
            api('user-place/get-countries', 'get', '');

        this.setState({countries: countries})

        const token = getToken();
        if (token) await this.setState({isLogged: true});
    }


    async doRegister() {
        try {
            const response = await api('auth/register', 'post', {
                name: this.state.firstname,
                surname: this.state.lastname,
                username: this.state.username,
                email: this.state.email,
                contactPhone: this.state.phone,
                password: this.state.password,
                address: this.state.address,
                city: +this.state.city,
                country: +this.state.country,
            })

            if (response.role === 'Korisnik') {
                await this.setState({errorMessage: ''})
                await this.setState({message: 'Uspješno ste registrovani!'})
            }

        } catch (e) {
            await this.setState({message: ''})
            await this.setState({errorMessage: e.response.data.message})
        }
    }

    async onInputFieldChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        await this.setState(newState);
    }

    async onSelectCountry(event) {
        const cities = await api(`user-place/get-cities/${event.target.value}`, 'get', '');

        await this.setState({cities: cities, country: event.target.value})
    }

    async onSelectCity(event) {
        await this.setState({city: event.target.value})
    }


    render() {
        if (this.state.isLogged) return (<Redirect to={getCurrentUser().role === 'Korisnik' ? '/' : '/employee'}/>);

        return (
            <div className={'center-content'}>
                <Col md={{span: 8, offset: 2}}>
                    <Card>
                        <Card.Header className={'p-3 bg-primary text-white'}>
                            <Card.Title className={'text-md-center'}>
                                <FontAwesomeIcon icon={faUserPlus}/> Registracija korisnika
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <br/>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Control required id="firstname" type="text" placeholder="Ime"
                                                      onChange={event => this.onInputFieldChange(event)}/>
                                    </Col>
                                    <Col>
                                        <Form.Control required id="lastname" type="text" placeholder="Prezime"
                                                      onChange={event => this.onInputFieldChange(event)}/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <InputGroup>
                                            <InputGroup.Text>@</InputGroup.Text>
                                            <Form.Control type="text" id="username" required
                                                          placeholder="Korisničko ime"
                                                          onChange={event => this.onInputFieldChange(event)}/>
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Form.Control type="email" id="email" required placeholder="Email"
                                                      onChange={event => this.onInputFieldChange(event)}/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <Form.Control type="text" id="phone" required placeholder="Kontakt telefon"
                                                      onChange={event => this.onInputFieldChange(event)}/>
                                    </Col>
                                    <Col>
                                        <Form.Control required type="password" id="password" placeholder="Lozinka"
                                                      onChange={event => this.onInputFieldChange(event)}/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Control type="text" required placeholder="Adresa" id="address"
                                                      onChange={event => this.onInputFieldChange(event)}/>
                                    </Col>
                                    <Col>
                                        <select id="country" required className="form-select"
                                                onChange={event => this.onSelectCountry(event)}>
                                            <option value={''}>Izaberi državu</option>
                                            {this.state.countries.map(country => <option
                                                value={country.countryId}
                                                key={country.countryId}> {country.countryName} </option>)}
                                        </select>
                                    </Col>
                                    <Col>
                                        <select id="city" className="form-select"
                                                onChange={event => this.onSelectCity(event)}>
                                            <option value={''}>Izaberi grad</option>
                                            {this.state.cities.map(city => <option key={city.cityId}
                                                                                   value={city.cityId}> {city.cityName} </option>)}
                                        </select>
                                    </Col>
                                </Row>
                                <br/>
                                <div className={'text-md-center'}><Button variant="primary"
                                                                          className={'fw-bold p-2 ps-4 pe-4'}
                                                                          onClick={async () => {
                                                                              await this.doRegister()
                                                                          }}>Registruj se</Button></div>
                            </Form>
                            <Alert variant="success"
                                   className={this.state.message ? 'mt-3 fw-bold text-md-center' : 'd-none'}>
                                {this.state.message}
                            </Alert>
                            <Alert variant="danger"
                                   className={this.state.errorMessage ? 'mt-3 fw-bold text-md-center' : 'd-none'}>
                                {this.state.errorMessage}
                            </Alert>
                        </Card.Body>
                        <Card.Footer>
                            <div className={'mt-1 d-flex justify-content-center align-content-center'}>
                                <p>
                                    <span className={'fw-bold'}>Već ste registrovani? </span>
                                    <span>
                                        <Link className={'font-italic text-decoration-none'}
                                              to={'/login'}>Prijavi se</Link>
                                    </span>
                                </p>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </div>
        );
    }
}