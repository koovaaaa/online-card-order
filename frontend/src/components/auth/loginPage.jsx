import React, {Component} from "react";
import {Alert, Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import api, {getCurrentUser, getToken, saveToken} from "../../api/api";
import jwtDecode from "jwt-decode";
import {Link, Redirect} from "react-router-dom";

export default class LoginPage extends Component {
    state = {
        usernameOrEmail: '',
        password: '',
        isLogged: false,
        errorMessage: ''
    }

    async componentDidMount() {
        const token = getToken();
        if (token) await this.setState({isLogged: true});
    }


    async onInputFieldChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        await this.setState(newState);
    }

    async doLogin() {
        try {
            const response = await api('auth/login', 'post', {
                usernameOrEmail: this.state.usernameOrEmail,
                password: this.state.password
            })

            if (response) {
                saveToken(response);
                const user = jwtDecode(response);
                const {state} = this.props.location;
                if (user.role === 'Admin' || user.role === 'Zaposleni') window.location = '/employee';
                else window.location = state ? state.from.pathname : '/';
                await this.setState({isLogged: true, errorMessage: ''})
            }
        } catch (e) {
            await this.setState({errorMessage: e.response.data.message})
        }
    }

    render() {
        if (this.state.isLogged) return (<Redirect to={getCurrentUser().role === 'Korisnik' ? '/' : '/employee'}/>)
        return (
            <div className={'center-content'}>
                <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Header className={'p-3 bg-success text-white'}>
                            <Card.Title className={'text-md-center'}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Prijava korisnika
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor="username">Korisničko ime /
                                        Email</Form.Label>
                                    <Form.Control type="text" id="usernameOrEmail"
                                                  className={'text-md-center'}
                                                  placeholder="Unesite korisničko ime ili email"
                                                  onChange={event => this.onInputFieldChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'mt-2 text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor="password">Lozinka</Form.Label>
                                    <Form.Control className={'text-md-center'} type="password" id="password"
                                                  placeholder="Unesite lozinku"
                                                  onChange={event => this.onInputFieldChange(event)}/>
                                </Form.Group>
                                <br/>
                                <div className={'text-md-center'}>
                                    <Button variant="success" className={'fw-bold p-2 ps-4 pe-4'} onClick={async () => {
                                        await this.doLogin()
                                    }}>Prijavi se</Button>
                                </div>
                            </Form>
                            <Alert variant="danger"
                                   className={this.state.errorMessage ? 'mt-3 text-md-center fw-bold' : 'd-none'}>
                                {this.state.errorMessage}
                            </Alert>
                        </Card.Body>
                        <Card.Footer>
                            <div className={'mt-1 d-flex justify-content-center align-content-center'}>
                                <p>
                                    <span className={'fw-bold'}>Nemate profil? </span>
                                    <span>
                                        <Link className={'font-italic text-decoration-none'} to={'/register'}>Registruj se</Link>
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