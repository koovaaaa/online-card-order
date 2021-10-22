import {Component} from "react";
import {Alert, Card, Col, Container, Row, Table} from "react-bootstrap";
import api from "../../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../common/pagination";

export default class OrdersPage extends Component {
    state = {
        orders: [],
        numberOfOrders: '',
        ordersPerPage: '',
        currentPage: 1,
        targetValue: 'active'
    }

    async componentDidMount() {
        const orders = await api(`employee-order/get-active-orders`, 'get', '');
        this.setState({
            orders: orders.orders,
            numberOfOrders: orders.numberOfOrders,
            ordersPerPage: orders.ordersPerPage
        });
    }

    async getOrdersHistory() {
        const orders = await api(`employee-order/get-order-history`, 'get', '');
        this.setState({
            orders: orders.orders,
            numberOfOrders: orders.numberOfOrders,
            ordersPerPage: orders.ordersPerPage,
            targetValue: 'history',
            currentPage: 1
        });
    }

    handlePageChange = async (page) => {
        await this.setState({currentPage: page});
        console.log(this.state.currentPage);
        let orders = '';
        if (this.state.targetValue === 'active') {
            orders = await api(`employee-order/get-active-orders?page=${this.state.currentPage}`, 'get', '');
        } else {
            orders = await api(`employee-order/get-order-history?page=${this.state.currentPage}`, 'get', '');
        }

        this.setState({orders: orders.orders, numberOfOrders: orders.numberOfOrders})
    }

    async getActiveOrders() {
        const orders = await api(`employee-order/get-active-orders`, 'get', '');
        this.setState({
            orders: orders.orders,
            numberOfOrders: orders.numberOfOrders,
            ordersPerPage: orders.ordersPerPage,
            targetValue: 'active',
            currentPage: 1
        });
    }

    render() {
        const {orders, numberOfOrders, ordersPerPage, currentPage, targetValue} = this.state;
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
                                <button className={targetValue === 'active' ? 'nav-link fw-bold text-dark' : 'nav-link'}
                                        onClick={async () => {
                                            await this.getActiveOrders()
                                        }}> Aktivne narudžbe
                                </button>
                            </li>
                            <li value={'history-orders'}>
                                <button
                                    className={targetValue === 'history' ? 'nav-link fw-bold text-dark' : 'nav-link'}
                                    onClick={async () => {
                                        await this.getOrdersHistory()
                                    }}> Istorija narudžbi
                                </button>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        {orders.length ?
                            <Card>
                                <Table striped borderless hover>
                                    <thead className={'bg-success text-white'}>
                                    <tr>
                                        <th className={'text-md-center'}>#</th>
                                        <th>Datum kreiranja narudžbe</th>
                                        <th>Cijena narudžbe</th>
                                        <th>Narudžbu kreirao</th>
                                        <th>Status narudžbe</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map(order =>
                                        <tr key={order.orderId}>
                                            <td>{order.orderId}</td>
                                            <td>{order.createdAt}</td>
                                            <td className={'text-md-end'}>{order.orderPrice + ' BAM'}</td>
                                            <td>{order.cart.createdBy.email}</td>
                                            <td>{order.orderStatus === orderStatus.rejected ?
                                                <span
                                                    className={'fw-bold text-danger'}>{orderStatus.rejected.toUpperCase()}</span> :
                                                (order.orderStatus === orderStatus.accepted ?
                                                        <span
                                                            className={'fw-bold text-success'}>{orderStatus.accepted.toUpperCase()}</span> :
                                                        <span
                                                            className={'fw-bold text-primary'}>{orderStatus.pending.toUpperCase()}</span>
                                                )}
                                            </td>
                                            <td><Link to={`view-order/${order.orderId}`} className={'btn btn-primary'}>
                                                <FontAwesomeIcon
                                                    icon={faEye}/> Pregledaj</Link></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </Card> :
                            <Alert variant={'success'} className={'fw-bold text-md-center'}>Trenutno nema aktivnih
                                narudžbi</Alert>
                        }
                        {orders.length ? <Pagination eventsCount={numberOfOrders} currentPage={currentPage}
                                                     pageSize={ordersPerPage}
                                                     onPageChange={this.handlePageChange}/> : ''}
                    </Col>
                </Row>
            </Container>
        );
    }
}