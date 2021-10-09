import {Component} from "react";
import {Alert, Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCity} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";
import {Redirect} from "react-router-dom";

export default class AddNewCity extends Component {
    state = {
        countries: [],
        city: '',
        postalCode: '',
        country: '',
        errorMessage: '',
        isAdded: false
    }

    async componentDidMount() {
        const countries = await api('admin/places/country/get-countries', 'get', '');
        await this.setState({countries});
    }

    async handleChangeInput(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        });
        await this.setState(newState);
    }

    async addCity() {
        try {
            const response = await api('admin/places/city/add-city', 'post', {
                cityName: this.state.city,
                postalCode: this.state.postalCode,
                country: this.state.country
            });
            if (response) await this.setState({isAdded: true})
        } catch (e) {
            await this.setState({errorMessage: e.response.data.message})
        }
    }

    render() {
        if (this.state.isAdded) return (<Redirect to={'location'}/>)
        return (
            <Container>
                <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faCity}/> Dodaj novi grad
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor={"city"}>Naziv grada</Form.Label>
                                    <Form.Control id={"city"} type={"text"}
                                                  placeholder={"Unesite naziv grada"}
                                                  onChange={event => this.handleChangeInput(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor={"postalCode"}>Poštanski broj</Form.Label>
                                    <Form.Control id={"postalCode"} type={"text"}
                                                  placeholder={"Unesite poštanski broj"}
                                                  onChange={event => this.handleChangeInput(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor={"country"}>Država</Form.Label>
                                    <select id={"country"} className={"form-select"}
                                            onChange={event => this.handleChangeInput(event)}>
                                        <option value={''}>Izaberi državu</option>
                                        {this.state.countries.map(country =>
                                            <option key={country.countryId}
                                                    value={country.countryId}>{country.countryName}</option>
                                        )}
                                    </select>
                                </Form.Group>
                                <br/>
                                <Button variant={"primary"} onClick={async () => await this.addCity()}>Potvrdi</Button>
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