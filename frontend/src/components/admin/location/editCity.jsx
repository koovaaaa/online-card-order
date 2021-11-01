import {Component} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import api from "../../../api/api";
import {Redirect} from "react-router-dom";

export default class EditCity extends Component {
    state = {
        cityId: this.props.match.params.id,
        cityName: '',
        postalCode: '',
    }

    async componentDidMount() {
        const city = await api(`admin/places/city/get-city/${this.state.cityId}`, 'get', '');
        await this.setState({
            cityName: city.cityName,
            postalCode: city.postalCode,
            isEdited: false
        });
    }

    async handleInputFieldChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        })

        await this.setState(newState);
    }

    async doEdit() {
        const response = await api(`admin/places/city/edit-city/${this.state.cityId}`, 'put', {
            cityName: this.state.cityName,
            postalCode: this.state.postalCode
        });
        if (response) await this.setState({isEdited: true})
    }


    render() {
        if (this.state.isEdited) return (<Redirect to={'../location'}/>);
        return (
            <Container className={'mt-5'}>
                <Col md={{span: 3, offset: 4}}>
                    <Card>
                        <Card.Header className={'p-3 bg-warning'}>
                            <Card.Title className={'text-md-center'}>
                                <FontAwesomeIcon icon={faEdit}/> Izmijeni informacije
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"cityName"}>Naziv
                                        grada</Form.Label>
                                    <Form.Control className={'text-md-center'} type={"text"} id={"cityName"}
                                                  value={this.state.cityName}
                                                  onChange={event => this.handleInputFieldChange(event)}/>
                                </Form.Group>
                                <Form.Group className={'text-md-center'}>
                                    <Form.Label className={"small fw-bold"} htmlFor={"postalCode"}>Poštanski
                                        broj</Form.Label>
                                    <Form.Control className={'text-md-center'} type={"text"} id={"postalCode"}
                                                  value={this.state.postalCode}
                                                  onChange={event => this.handleInputFieldChange(event)}/>
                                </Form.Group>
                                <br/>
                                <div className={'text-md-center'}>
                                    <Button variant={"warning"} className={'fw-bold pe-4 ps-4 p-2'}
                                            onClick={async () => await this.doEdit()}>Potvrdi</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}