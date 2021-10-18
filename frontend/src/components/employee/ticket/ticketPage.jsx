import {Component} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import api from "../../../api/api";
import * as moment from "moment";

export default class TicketPage extends Component {
    state = {
        ticketId: this.props.match.params.id,
        ticketName: '',
        description: '',
        ticketPrice: '',
        ticketCount: '',
        createdAt: '',
        createdBy: '',
        editedAt: '',
        editedBy: '',
        eventName: ''
    }

    async componentDidMount() {
        const ticket = await api(`employee-ticket/get-ticket/${this.state.ticketId}`, 'get', '');
        ticket.createdAt = moment(ticket.createdAt).format('DD/MM/YYYY u HH:mm');

        if (ticket.editedAt) {
            ticket.editedAt = moment(ticket.editedAt).format('DD/MM/YYYY u HH:mm');
            this.setState({editedAt: ticket.editedAt, editedBy: ticket.editedBy.username});
        }

        this.setState({
            ticketName: ticket.ticketName,
            description: ticket.description,
            ticketPrice: ticket.ticketPrice,
            ticketCount: ticket.ticketCount,
            createdAt: ticket.createdAt,
            createdBy: ticket.createdBy.username,
            eventName: ticket.event.eventName
        })
    }


    render() {
        const {
            ticketCount,
            createdAt,
            ticketName,
            createdBy,
            ticketPrice,
            editedAt,
            editedBy,
            eventName,
            description
        } = this.state;
        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <Table hover className={"table"}>
                            <tbody>
                            <tr>
                                <td className={'fw-bold'}>Naziv ulaznice</td>
                                <td>{ticketName}</td>
                            </tr>
                            <tr>
                                <td className={'fw-bold'}>Opis ulaznice</td>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <td className={'fw-bold'}>Događaj</td>
                                <td>{eventName}</td>
                            </tr>
                            <tr>
                                <td className={'fw-bold'}>Cijena ulaznice</td>
                                <td>{ticketPrice + ' BAM'}</td>
                            </tr>
                            <tr>
                                <td className={'fw-bold'}>Dostupne ulaznice</td>
                                <td>{ticketCount}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={6}>
                        <Table hover className={"table"}>
                            <tbody>
                            <tr>
                                <td className={'fw-bold'}>Ulaznica dodata</td>
                                <td>{createdAt}</td>
                            </tr>
                            <tr>
                                <td className={'fw-bold'}>Ulaznicu dodao</td>
                                <td>{createdBy}</td>
                            </tr>
                            {editedAt ?
                                <>
                                    <tr>
                                        <td className={'fw-bold'}>Ulaznica izmjenjena</td>
                                        <td>{editedAt}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Ulaznicu izmjenio</td>
                                        <td>{editedBy}</td>
                                    </tr>
                                </>
                                : ''}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}