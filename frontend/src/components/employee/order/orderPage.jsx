import {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import {Link, Redirect} from "react-router-dom";
import {Button, Card, Col, Image, Modal, Row, Table} from "react-bootstrap";
import approved from '../../../assets/images/approved.png';
import pending from '../../../assets/images/pending.png';
import rejected from '../../../assets/images/rejected.png';
import api from "../../../api/api";
import * as moment from 'moment';

export default class OrderPage extends Component {
    state = {
        orderId: this.props.match.params.id,
        orderStatus: '',
        createdAt: '',
        orderPrice: '',
        firstName: '',
        lastName: '',
        username: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        cartTickets: [],
        isDone: false,
        showAccept: false,
        showReject: false
    }

    async componentDidMount() {
        const order = await api(`employee-order/get-order/${this.state.orderId}`, 'get', '');
        order.createdAt = moment(order.createdAt).format('DD/MM/YYYY u HH:mm');
        this.setState({
            orderStatus: order.orderStatus,
            createdAt: order.createdAt,
            orderPrice: order.orderPrice,
            firstName: order.cart.createdBy.name,
            lastName: order.cart.createdBy.surname,
            username: order.cart.createdBy.username,
            address: order.cart.createdBy.address,
            city: order.cart.createdBy.city.cityName,
            postalCode: order.cart.createdBy.city.postalCode,
            country: order.cart.createdBy.country.countryName,
            cartTickets: order.cart.cartTickets
        });
    }

    async rejectOrder() {
        this.setState({showReject: false});
        const response = await api(`employee-order/change-order-status/${this.state.orderId}`, 'put', {orderStatus: 'Odbijeno'});
        if (response) this.setState({isDone: true});
    }

    async acceptOrder() {
        this.setState({showAccept: false});
        const response = await api(`employee-order/change-order-status/${this.state.orderId}`, 'put', {orderStatus: 'Prihvaćeno'});
        if (response) this.setState({isDone: true});
    }

    handleCloseAccept = () => {
        this.setState({showAccept: false});
    }

    handleShowAccept = () => {
        this.setState({showAccept: true});
    }

    handleCloseReject = () => {
        this.setState({showReject: false});
    }

    handleShowReject = () => {
        this.setState({showReject: true});
    }

    render() {
        const {
            orderStatus,
            createdAt,
            orderPrice,
            firstName,
            lastName,
            username,
            address,
            postalCode,
            city,
            country,
            cartTickets,
            isDone,
            showAccept,
            showReject
        } = this.state;
        const orderStatusTemp = {
            pending: 'Na čekanju',
            approved: 'Prihvaćeno',
            rejected: 'Odbijeno'
        }

        if (isDone) return (<Redirect to={'../orders'}/>)

        return (
            <>
                <Link className={'btn btn-danger m-1'} to={'../orders'}><FontAwesomeIcon
                    icon={faAngleDoubleLeft}/> Nazad</Link>
                <div className={'text-md-center'}>
                    <Image
                        src={orderStatus === orderStatusTemp.pending ? pending : (orderStatus === orderStatusTemp.approved ? approved : rejected)}/>
                </div>
                <Row>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <h4 className={'text-md-center'}>Podaci o narudžbi</h4>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td className={'fw-bold'}>Datum i vrijeme kreiranja</td>
                                        <td className={'text-md-start'}>{createdAt}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Cijena narudžbe</td>
                                        <td className={'text-md-start'}>{orderPrice + ' BAM'}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                                <br/>
                                <h5 className={'text-md-center'}>Korpa</h5>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th className={'text-md-center'}>#</th>
                                        <th className={'text-md-center'}>Ulaznica</th>
                                        <th className={'text-md-center'}>Događaj</th>
                                        <th className={'text-md-center'}>Količina</th>
                                        <th className={'text-md-center'}>Cijena</th>
                                        <th className={'text-md-center'}>Ukupno</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartTickets.map(cartTicket =>
                                        <tr key={cartTicket.cartTicketId}>
                                            <td>{cartTicket.cartTicketId}</td>
                                            <td>{cartTicket.ticket.ticketName}</td>
                                            <td>{cartTicket.ticket.event.eventName}</td>
                                            <td className={'text-md-center'}>{cartTicket.quantity}</td>
                                            <td className={'text-md-end'}>{cartTicket.ticket.ticketPrice + ' BAM'}</td>
                                            <td className={'text-md-end'}>{parseFloat(cartTicket.quantity * cartTicket.ticket.ticketPrice).toFixed(2) + ' BAM'}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <br/>
                    </Col>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <h4 className={'text-md-center'}>Podaci o korisniku</h4>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td className={'fw-bold'}>Ime i prezime</td>
                                        <td>{`${firstName} ${lastName}`}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Korisničko ime</td>
                                        <td>{username}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Adresa</td>
                                        <td>{address}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Poštanski broj</td>
                                        <td>{postalCode}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Grad</td>
                                        <td>{city}</td>
                                    </tr>
                                    <tr>
                                        <td className={'fw-bold'}>Država</td>
                                        <td>{country}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {orderStatus === orderStatusTemp.pending ?
                    <div className={'text-md-center'}>
                        <Button className={'m-3'} variant={'success'} onClick={() => this.handleShowAccept()}>Prihvati
                            narudžbu</Button>
                        <Button variant={'danger'} onClick={() => this.handleShowReject()}>Odbij narudžbu</Button>
                    </div> : ''
                }
                <Modal show={showReject} onHide={this.handleCloseReject}>
                    <Modal.Header closeButton>
                        <Modal.Title>Odbij narudžbu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className={'fw-bold'}>Da li ste sigurni da želite da odbijete narudžbu?</span>
                        <br/><br/>
                        <span className={'small'}>Napomena: Nakon ove akcije, nećete biti u mogućnosti da promijenite status narudžbe!</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'success'} onClick={this.handleCloseReject}>Izađi</Button>
                        <Button variant={'danger'} onClick={async () => await this.rejectOrder()}> Potvrdi
                            akciju</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showAccept} onHide={this.handleCloseAccept}>
                    <Modal.Header closeButton>
                        <Modal.Title>Prihvati narudžbu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className={'fw-bold'}>Da li ste sigurni da želite da prihvatite narudžbu?</span>
                        <br/><br/>
                        <span className={'small'}>Napomena: Nakon ove akcije, nećete biti u mogućnosti da promijenite status narudžbe!</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'danger'} onClick={this.handleCloseAccept}>Izađi</Button>
                        <Button variant={'success'} onClick={async () => await this.acceptOrder()}> Potvrdi
                            akciju</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}