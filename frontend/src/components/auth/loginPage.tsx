import React from "react";
import {Alert, Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import api, {saveToken} from '../../api/api';
import {Redirect} from "react-router-dom";

interface LoginPageState {
    email: string;
    password: string;
    errorMessage: string;
    isLoggedIn: boolean;
}
 
export default class LoginPage extends React.Component {
    state: LoginPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            isLoggedIn: false
        }
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        this.setState(newState);
    }

    private async doLogin() {
        try {
            const data = await api('auth/login', 'post', {
                usernameOrEmail: this.state.email,
                password: this.state.password
            })

            if (this.state.password === '') this.setErrorMessage('Unesite lozinku!');

            if (data) saveToken(data);
            this.setLoginState(true);
        } catch (e: any) {
            this.setErrorMessage(e.response.data.message);
        }
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            errorMessage: message
        })

        this.setState(newState);
    }

    private setLoginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn
        })

        this.setState(newState);
    }

    render() {
        if (this.state.isLoggedIn) {
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
                                <FontAwesomeIcon icon={faSignInAlt}/> User Login
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" id="email" placeholder="Enter email"
                                                  value={this.state.email}
                                                  onChange={event => this.formInputChanged(event as any)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" id="password" placeholder="Password"
                                                  value={this.state.password}
                                                  onChange={event => this.formInputChanged(event as any)}/>
                                </Form.Group>
                                <Button variant="primary"
                                        onClick={() => this.doLogin()}>
                                    Submit
                                </Button>
                            </Form>
                            <Alert variant="danger"
                                   className={this.state.errorMessage ? '' : 'd-none'}>
                                {this.state.errorMessage}
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}