import {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartArrowDown, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Alert, Button, Modal, Nav, Table} from "react-bootstrap";
import api from "../../api/api";


export default class Cart extends Component {
    state = {
        show: false,
        cart: null,
        cartLength: 0,
        totalPrice: '',
        notification: false,
        message: '',
        alertVariant: ''
    }

    async componentDidMount() {
        const response = await api(`user-cart/get-current-cart`, 'get', '');

        if (response) {
            this.setState({
                cart: response.cart,
                totalPrice: response.totalPrice,
                cartLength: response.cart.cartTickets.length
            });
        }
    }


    handleShow = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    closeNotification = () => {
        this.setState({notification: false});
    }

    handleIncrement = async (id, quantity) => {
        quantity++;
        const response = await api(`user-cart/edit-cart`, 'put', {
            ticket: id,
            quantity: quantity
        })

        if (response) {
            this.setState({
                cart: response.cart,
                totalPrice: response.totalPrice,
                cartLength: response.cart.cartTickets.length
            });
        }
    }

    handleDecrement = async (id, quantity) => {
        quantity--;
        const response = await api(`user-cart/edit-cart`, 'put', {
            ticket: id,
            quantity: quantity
        })

        if (response) {
            this.setState({
                cart: response.cart,
                totalPrice: response.totalPrice,
                cartLength: response.cart.cartTickets.length
            });
        }
    }

    makeOrder = async () => {
        this.setState({show: false});
        try {
            await api('user-order/make-order', 'post', {});
            this.setState({
                notification: true,
                message: 'Vaša narudžba je uspješno primljena!',
                alertVariant: 'success'
            });
        } catch (e) {
            this.setState({notification: true, message: e.response.data.message, alertVariant: 'danger'});
        }
    }


    render() {
        const {show, cartLength, cart, totalPrice, notification, message, alertVariant} = this.state;
        return (
            <>
                <Nav.Link active={false} onClick={() => this.handleShow()}><FontAwesomeIcon
                    icon={faCartArrowDown}/> ({cartLength})</Nav.Link>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className={'m-auto'}><FontAwesomeIcon icon={faCartArrowDown}/> Korpa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={'m-auto'}>
                        {cartLength ?
                            <Table borderless>
                                <tbody>
                                {cart.cartTickets.map(ticket =>
                                    <tr>
                                        <td className={'w-25'}>
                                            <img className={'w-100'} alt={'eventPhoto'}
                                                 src={process.env.REACT_APP_API_URL + ticket.ticket.event.eventPhoto}/>
                                        </td>
                                        <td>
                                            <span className={'fw-bold'}>{ticket.ticket.event.eventName}</span><br/>
                                            <span
                                                className={'small font-italic'}><i>{ticket.ticket.ticketName}</i></span>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => this.handleDecrement(ticket.ticket.ticketId, ticket.quantity)}
                                                variant={'danger'}><FontAwesomeIcon
                                                icon={faMinus}/></Button>
                                            &nbsp; <span className={'fw-bold'}>{ticket.quantity}</span> &nbsp;
                                            <Button disabled={ticket.quantity >= +10}
                                                    onClick={() => this.handleIncrement(ticket.ticket.ticketId, ticket.quantity)}
                                                    variant={'success'}><FontAwesomeIcon
                                                icon={faPlus}/></Button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                                <tfoot>
                                <tr className={'align-text-bottom'}>
                                    <td className={'fw-bold text-md-end'} colSpan={2}>Ukupna cijena:</td>
                                    <td className={'fw-bold text-md-center'}>{totalPrice}</td>
                                </tr>
                                </tfoot>
                            </Table>
                            :
                            <span className={'fw-bold'}> Vaša korpa je prazna!</span>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'danger'} onClick={this.handleClose}>Izađi</Button>
                        <Button disabled={!cartLength} variant={'success'} onClick={this.makeOrder}>Potvrdi
                            narudžbu</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={notification} onHide={this.closeNotification}>
                    <Modal.Header closeButton>
                        <Modal.Title>Obavještenje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant={alertVariant} className={'text-md-center fw-bold'}>{message}</Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'danger'} onClick={this.closeNotification}>Izađi</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}