import {Component} from "react";
import api from "../../api/api";
import {Alert, Button, Card, Col, Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import approved from '../../assets/images/approved.png';
import pending from '../../assets/images/pending.png';
import rejected from '../../assets/images/rejected.png';

export default class MyOrders extends Component {
    state = {
        orders: [],
        show: false,
        tickets: [],
        status: ''
    }

    async componentDidMount() {
        const orders = await api(`user-order/my-orders`, 'get', '');
        if (orders) this.setState({orders: orders.orders});
    }

    handleShow = (tickets, status) => {
        this.setState({show: true, tickets, status});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    render() {
        const {orders, show, tickets, status} = this.state;
        const orderStatus = {
            approved: 'Prihvaćeno',
            pending: 'Na čekanju',
            rejected: 'Odbijeno'
        }
        return (
            orders.length ?
                <>
                    <Col md={{span: 8, offset: 2}}>
                        <Card className={'mt-5'}>
                            <Table striped hover borderless>
                                <thead className={'text-white bg-success'}>
                                <tr>
                                    <th className={'text-md-center'}>#</th>
                                    <th className={'text-md-center'}>Datum kreiranja narudžbe</th>
                                    <th className={'text-md-center'}>Status narudžbe</th>
                                    <th className={'text-md-end'}>Cijena narudžbe</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order =>
                                    <tr key={order.orderId}>
                                        <td className={'text-md-center'}>{order.orderId}</td>
                                        <td className={'text-md-center'}>{order.createdAt}</td>
                                        <td className={'text-md-center'}>{order.orderStatus === orderStatus.approved ?
                                            <span
                                                className={'fw-bold text-success'}>{orderStatus.approved.toUpperCase()}</span> :
                                            (order.orderStatus === orderStatus.rejected ?
                                                <span
                                                    className={'fw-bold text-danger'}>{orderStatus.rejected.toUpperCase()}</span> :
                                                <span
                                                    className={'fw-bold text-primary'}>{orderStatus.pending.toUpperCase()}</span>)
                                        }</td>
                                        <td className={'text-md-end'}>{order.orderPrice}</td>
                                        <td className={'text-md-center'}><Button
                                            onClick={() => this.handleShow(order.cart.cartTickets, order.orderStatus)}><FontAwesomeIcon
                                            icon={faShoppingBasket}/> Korpa</Button></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                    <Modal show={show} onHide={this.handleClose}>
                        <Modal.Header>
                            <Modal.Title className={'m-auto text-md-center'}>
                                <img className={'w-75'}
                                     src={status === orderStatus.pending ? pending : (status === orderStatus.approved ? approved : rejected)}
                                     alt={'orderStatus'}/>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table borderless>
                                <tbody>
                                {tickets.map(ticket =>
                                    <tr key={ticket.ticket.ticketId}>
                                        <td className={'w-25'}><img className={'w-100'} alt={'eventPhoto'}
                                                                    src={process.env.REACT_APP_API_URL + ticket.ticket.event.eventPhoto}/>
                                        </td>
                                        <td>
                                            <span className={'fw-bold'}>{ticket.ticket.event.eventName}</span><br/>
                                            <span
                                                className={'small font-italic'}><i>{ticket.ticket.ticketName}</i></span>
                                        </td>
                                        <td className={'w-25'}><span
                                            className={'fw-bold'}>{ticket.quantity + ' kom.'}</span></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={'danger'} onClick={this.handleClose}> Izađi</Button>
                        </Modal.Footer>
                    </Modal>
                </>
                :
                <Alert className={'mt-5 fw-bold text-md-center'} variant={'warning'}>
                    Nemate kreiranih narudžbi!
                </Alert>
        );
    }
}