import {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartArrowDown, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal, Nav, Table} from "react-bootstrap";
import api from "../../api/api";


export default class Cart extends Component {
    state = {
        show: false,
        cart: null,
        cartLength: 0,
        totalPrice: ''
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

    handleIncrement = async (id, quantity) => {
        quantity++;
        console.log('Povecaj kartu', id, quantity);
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
        console.log('Smanji kartu', id, quantity);
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


    render() {
        const {show, cartLength, cart} = this.state;
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
                                            <img className={'w-100'}
                                                 src={process.env.REACT_APP_API_URL + ticket.ticket.event.eventPhoto}/>
                                        </td>
                                        <td>
                                            <span className={'fw-bold'}>{ticket.ticket.event.eventName}</span><br/>
                                            <span
                                                className={'small font-italic'}><i>{ticket.ticket.ticketName}</i></span>
                                        </td>
                                        <td>
                                            <Button disabled={ticket.quantity === +0}
                                                    onClick={() => this.handleDecrement(ticket.ticket.ticketId, ticket.quantity)}
                                                    variant={'danger'}><FontAwesomeIcon
                                                icon={faMinus}/></Button>
                                            &nbsp; <span className={'fw-bold'}>{ticket.quantity}</span> &nbsp;
                                            <Button disabled={ticket.quantity === +10}
                                                    onClick={() => this.handleIncrement(ticket.ticket.ticketId, ticket.quantity)}
                                                    variant={'success'}><FontAwesomeIcon
                                                icon={faPlus}/></Button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                            :
                            <span className={'fw-bold'}> Vaša korpa je prazna!</span>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'danger'} onClick={this.handleClose}>Izađi</Button>
                        <Button disabled={!cartLength} variant={'success'} onClick={this.handleClose}>Potvrdi
                            narudžbu</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}