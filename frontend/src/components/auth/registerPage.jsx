import {Component} from "react";
import {Alert, Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";

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
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const countries = await
            api('user-place/get-countries', 'get', '');

        this.setState({countries: countries})
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
                country: +this.state.country
            })

            if (response.role === 'user') {
                await this.setState({errorMessage: ''})
                await this.setState({message: 'Uspješno ste registrovani!'})
            }
            console.log(response);
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

        console.log(this.state);

    }

    async onSelectCountry(event) {
        const cities = await api(`user-place/get-cities/${event.target.value}`, 'get', '');

        await this.setState({cities: cities, country: event.target.value})
        console.log(this.state);
    }

    async onSelectCity(event) {
        await this.setState({city: event.target.value})
        console.log(this.state);
    }


    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faUserPlus}/> Registracija korisnika
                        </Card.Title>
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
                                <Col>
                                    <InputGroup>
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Form.Control type="text" id="username" required placeholder="Korisničko ime"
                                                      onChange={event => this.onInputFieldChange(event)}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Form.Control type="email" id="email" required placeholder="Email"
                                                  onChange={event => this.onInputFieldChange(event)}/>
                                </Col>
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
                                <Col xs={7}>
                                    <Form.Control type="text" required placeholder="Adresa" id="address"
                                                  onChange={event => this.onInputFieldChange(event)}/>
                                </Col>
                                <Col>
                                    <select id="country" required className="form-select"
                                            onChange={event => this.onSelectCountry(event)}>
                                        <option>Izaberi drzavu</option>
                                        {this.state.countries.map(country => <option
                                            value={country.countryId}
                                            key={country.countryId}> {country.countryName} </option>)}
                                    </select>
                                </Col>
                                <Col>
                                    <select id="city" className="form-select"
                                            onChange={event => this.onSelectCity(event)}>
                                        <option>Izaberi grad</option>
                                        {this.state.cities.map(city => <option key={city.cityId}
                                                                               value={city.cityId}> {city.cityName} </option>)}
                                    </select>
                                </Col>
                            </Row>
                            <br/>
                            <Button variant="primary" onClick={async () => {
                                console.log(this.state);
                                await this.doRegister()
                            }}>Registruj se</Button>
                        </Form>
                        <br/>
                        <Alert variant="success" className={this.state.message ? '' : 'd-none'}>
                            {this.state.message}
                        </Alert>
                        <Alert variant="danger" className={this.state.errorMessage ? '' : 'd-none'}>
                            {this.state.errorMessage}
                        </Alert>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}