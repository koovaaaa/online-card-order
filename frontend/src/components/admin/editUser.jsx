import {Component} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";
import {Redirect} from "react-router-dom";

export default class EditUser extends Component {
    state = {
        userId: this.props.match.params.id,
        user: [],
        role: '',
        roles: ['Korisnik', 'Zaposleni', 'Admin'],
        isEdited: false
    }

    async componentDidMount() {
        const user = await api(`admin/users/get-user/${this.state.userId}`, 'get', '');
        await this.setState({user});
    }

    async doEdit() {
        if (this.state.role === '') await this.setState({isEdited: true});
        const response = await api(`admin/users/edit-user/${this.state.userId}`, 'put', {
            role: this.state.role
        })
        if (response) await this.setState({isEdited: true})
    }

    async onSelectChange(event) {
        await this.setState({role: event.target.value})
    }


    render() {
        if (this.state.isEdited) return (<Redirect to={'../users'}/>);

        return (
            <Container>
                <Col md={{span: 3, offset: 4}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faEdit}/> Promijeni ulogu korisnika
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label
                                        className={"small fw-bold"}>{this.state.user.role}: {this.state.user.name + ' ' + this.state.user.surname}</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={"small fw-bold"} htmlFor={"role"}>Uloga: </Form.Label>
                                    <select id={"role"} className={"form-select"}
                                            onChange={event => this.onSelectChange(event)}>
                                        <option value={''}>Izaberi ulogu</option>
                                        {this.state.roles.map(role =>
                                            <option key={role} value={role}>{role}</option>
                                        )}
                                    </select>
                                </Form.Group>
                                <br/>
                                <Button variant={"primary"}
                                        onClick={async () => await this.doEdit()}>Potvrdi</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}