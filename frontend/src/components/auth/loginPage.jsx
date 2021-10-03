import React, {Component} from "react";
import {Alert, Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import api, {saveToken} from "../../api/api";
import {Redirect} from "react-router-dom";


export default class LoginPage extends Component {
    state = {
        usernameOrEmail: '',
        password: '',
        isLogged: false,
        errorMessage: ''
    }

    constructor(props) {
        super(props);
    }

    async onInputFieldChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        await this.setState(newState);

        console.log(this.state);
    }

    async doLogin() {
        try {
            const response = await api('auth/login', 'post', {
                usernameOrEmail: this.state.usernameOrEmail,
                password: this.state.password
            })

            if (response) {
                saveToken(response);
                await this.setState({isLogged: true, errorMessage: ''})

            }
        } catch (e) {
            await this.setState({errorMessage: e.response.data.message})
        }
    }

    render() {
        if (this.state.isLogged) {
            return (
                <Redirect to="/"/>
            );
        }
        
        return (
            <Container>
                <Col md={{span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faSignInAlt}/> Prijava korisnika
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="username">Korisničko ime / Email</Form.Label>
                                    <Form.Control type="text" id="usernameOrEmail"
                                                  placeholder="Unesite korisničko ime ili email"
                                                  onChange={event => this.onInputFieldChange(event)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Lozinka</Form.Label>
                                    <Form.Control type="password" id="password" placeholder="Unesite lozinku"
                                                  onChange={event => this.onInputFieldChange(event)}/>
                                </Form.Group>
                                <br/>
                                <Button variant="primary" onClick={async () => {
                                    await this.doLogin()
                                }}>Prijavi se</Button>
                            </Form>
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