import {Component} from "react";
import api, {getCurrentUser} from "../../api/api";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHourglassHalf, faMapMarkerAlt, faShoppingCart, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import '../../assets/css/eventPage.css';
import {Link} from "react-router-dom";


export class EventPage extends Component {
    state = {
        eventId: this.props.match.params.id,
        eventName: '',
        city: '',
        description: '',
        eventPhoto: '',
        eventDate: '',
    }

    async componentDidMount() {
        const event = await api(`user-event/get-event/${this.state.eventId}`, 'get', '');

        await this.setState({
            city: event.city.cityName,
            eventName: event.eventName,
            description: event.description,
            image: event.eventPhoto,
            eventDate: event.eventDate,
        });
    }

    render() {

        return (
            <Row>
                <Col xs={9}>
                    <Container>
                        <Image className={'event-img'}
                               src={process.env.REACT_APP_API_URL + this.state.image}/><br/><br/>
                        <h2>{this.state.eventName.toUpperCase()}</h2> <br/>
                        <h5><FontAwesomeIcon icon={faMapMarkerAlt}/> {this.state.city.toUpperCase()}</h5>
                        <h5><FontAwesomeIcon icon={faHourglassHalf}/> {this.state.eventDate}</h5>
                        <br/>
                        <span>{this.state.description}</span>
                    </Container>
                </Col>
                <Col>
                    <Card className={'event-card'} text={'white'}>
                        <br/>
                        <Card.Title className={"text-lg-center"}>Naruči kartu</Card.Title>
                        <Card.Body>
                            {getCurrentUser() ?
                                <Card.Text className={"text-sm-start"}>
                                    Klikom na dugme <strong>Naruči kartu</strong> započinjete proces kupovine karata
                                    za događaj: <br/>
                                    <strong>{this.state.eventName}</strong><br/>
                                    u terminu: <br/>
                                    <strong className={"text-md-center"}>{this.state.eventDate}</strong><br/><br/>
                                    <Card.Text className={"text-md-center"}>
                                        <Link className={"btn  button-card"}
                                              to={`${this.state.eventId}/tickets`}><FontAwesomeIcon
                                            icon={faShoppingCart}/> Naruči kartu</Link>
                                    </Card.Text>
                                </Card.Text> :
                                <Card.Text className={"text-sm-start"}>
                                    Da bi ste započeli proces kupovine karata potrebno je da se ulogujete!<br/><br/>
                                    <Card.Text className={"text-md-center"}>
                                        <Link className={"btn  button-card"}
                                              to={{
                                                  pathname: '/login', state: {from: this.props.location}
                                              }}>
                                            <FontAwesomeIcon icon={faSignInAlt}/> Prijavi se</Link>
                                    </Card.Text>
                                </Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}