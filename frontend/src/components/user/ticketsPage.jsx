import {Component} from "react";
import api from "../../api/api";
import {Alert, Button, Container, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

export class TicketsPage extends Component {
    state = {
        eventId: this.props.match.params.id,
        tickets: [],
        eventName: '',
        city: '',
    }

    async componentDidMount() {
        const tickets = await api(`user-ticket/get-event-tickets/${this.state.eventId}`, 'get', '');
        const event = await api(`user-event/get-event/${this.state.eventId}`, 'get', '');
        await this.setState({tickets, eventName: event.eventName, city: event.city.cityName});
    }


    render() {
        return (
            <Container>
                <h1 className={"text-md-center fw-bold"}>{this.state.eventName} @ {this.state.city}</h1>
                <br/><br/>
                {this.state.tickets.length ?
                    <Table hover className={"table table-borderless"}>
                        <thead className={"border-bottom"}>
                        <tr>
                            <th></th>
                            <th></th>
                            <th className={"text-md-end"}>Broj ulaznica na stanju</th>
                            <th className={"text-md-end"}>Cijena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tickets.map(ticket => <tr key={ticket.ticket.ticketId}>
                            <td><b>{ticket.ticket.ticketName.toUpperCase()}</b></td>
                            <td className={"text-md-start"}>{ticket.ticket.description}</td>
                            <td className={"text-md-end"}>{ticket.ticket.ticketCount}</td>
                            <td className={"text-md-end"}>{ticket.price}</td>
                            <td className={"text-md-center justify-content-around"}><Button
                                variant={"outline-primary"}><FontAwesomeIcon icon={faShoppingCart}/> Naruči
                                kartu</Button>
                            </td>
                        </tr>)}
                        </tbody>
                    </Table> :
                    <Alert className={'text-md-center'} variant={'warning'}>Za ovaj događaj ulaznice još
                        nisu objavljene!</Alert>
                }
            </Container>
        );
    }
}