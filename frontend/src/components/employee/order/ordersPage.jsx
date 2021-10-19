import {Component} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import api from "../../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEye, faTimes} from "@fortawesome/free-solid-svg-icons";

export default class OrderPage extends Component {
    state = {
        orders: []
    }

    async componentDidMount() {
        const orders = await api(`employee-order/get-active-orders`, 'get', '');
        this.setState({orders});
    }

    async getOrdersHistory() {
        const orders = await api(`employee-order/get-order-history`, 'get', '');
        this.setState({orders});
        console.log(this.state.orders);
    }

    async getActiveOrders() {
        const orders = await api(`employee-order/get-active-orders`, 'get', '');
        this.setState({orders});
        console.log(this.state.orders);
    }

    render() {
        const {orders} = this.state;
        const orderStatus = {
            pending: 'Na čekanju',
            rejected: 'Odbijeno',
            accepted: 'Prihvaćeno'
        }
        return (
            <Container>
                <Row>
                    <Col xs={2}>
                        <ul className={'nav nav-tabs flex-column'}>
                            <li value={'active-orders'}>
                                <button className={'nav-link'}
                                        onClick={async () => {
                                            await this.getActiveOrders()
                                        }}> Aktivne narudžbe
                                </button>
                            </li>
                            <li value={'history-orders'}>
                                <button className={'nav-link'}
                                        onClick={async () => {
                                            await this.getOrdersHistory()
                                        }}> Istorija narudžbi
                                </button>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <Table striped borderless hover>
                            <thead className={'border-bottom'}>
                            <tr>
                                <th className={'text-md-center'}>#</th>
                                <th>Datum kreiranja narudžbe</th>
                                <th>Cijena narudžbe</th>
                                <th>Narudžbu kreirao</th>
                                <th>Status narudžbe</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order =>
                                <tr className={order.orderStatus === orderStatus.rejected ? 'bg-danger text-white' :
                                    (order.orderStatus === orderStatus.accepted ? 'bg-success  text-white' : '')}
                                    key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.createdAt}</td>
                                    <td className={'text-md-end'}>{order.orderPrice + ' BAM'}</td>
                                    <td>{order.cart.createdBy.email}</td>
                                    <td>{order.orderStatus}</td>
                                    <td><Link to={`view-order/${order.orderId}`} className={'btn btn-primary'}>
                                        <FontAwesomeIcon
                                            icon={faEye}/> Pregledaj</Link></td>
                                    {order.orderStatus === 'Na čekanju' ?
                                        <>
                                            <td><Button variant={'success'}><FontAwesomeIcon
                                                icon={faCheck}/> Prihvati</Button>
                                            </td>
                                            <td><Button variant={'danger'}><FontAwesomeIcon
                                                icon={faTimes}/> Odbij</Button></td>
                                        </> :
                                        ''
                                    }
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}