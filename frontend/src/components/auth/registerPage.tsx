import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Card, Col, Container, InputGroup, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";

interface RegisterPageState {
    name: string,
    surname: string,
    username: string,
    email: string,
    contactPhone: string,
    password: string,
    address: string,
    cities: [],
    countries: []
}

export default class RegisterPage extends React.Component {
    state: RegisterPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            contactPhone: '',
            password: '',
            address: '',
            cities: [],
            countries: []
        }
    }

    async componentDidMount() {
        const data = await api('user-place/get-countries', 'get', '');

        this.setState({countries: data})
        console.log(this.state.countries);
    }


    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faUserPlus}/> User Register
                        </Card.Title>
                        <br/>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Control required type="text" placeholder="First name"/>
                                </Col>
                                <Col>
                                    <Form.Control required type="text" placeholder="Last name"/>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Form.Control type="text" required placeholder="Username"/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Form.Control type="email" required placeholder="Email"/>
                                </Col>
                                <Col>
                                    <Form.Control type="text" required placeholder="Phone number"/>
                                </Col>
                                <Col>
                                    <Form.Control required type="password" placeholder="Password"/>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col xs={7}>
                                    <Form.Control type="text" required placeholder="Address"/>
                                </Col>
                                <Col>
                                    <select className="form-select">
                                        <option selected>Izaberi državu</option>
                                        <option value={this.state.countries.map(country => country.countryId)}>
                                            {this.state.countries.map(country => country.countryName)}
                                        </option>
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-select" disabled>
                                        <option selected>Izaberi grad</option>
                                        <option value="1">One</option>
                                    </select>
                                </Col>
                            </Row>
                            <br/>
                            <Button variant="primary">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}