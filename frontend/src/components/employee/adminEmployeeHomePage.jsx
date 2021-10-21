import {Component} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getCurrentUser} from "../../api/api";
import '../../assets/css/adminEmployeeHomePage.css';

export default class AdminEmployeeHomePage extends Component {
    render() {
        return (
            <div className={'mt-5 justify-content-center'}>
                <Row xs={1} md={2} className={'g-4'}>
                    <Col>
                        <Link className={'text-decoration-none'} to={'employee/events'}>
                            <Card className={'l-bg-cherry'}>
                                <Card.Title className={'m-auto text-md-center'}>Događaji</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link className={'text-decoration-none'} to={'employee/orders'}>
                            <Card className={'l-bg-blue-dark'}>
                                <Card.Title className={'m-auto text-md-center'}>Narudžbe</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    {getCurrentUser().role === 'Admin' ?
                        <><Col>
                            <Link className={'text-decoration-none'} to={'admin/users'}>
                                <Card className={'l-bg-green-dark'}>
                                    <Card.Title className={'m-auto text-md-center'}>Korisnici</Card.Title>
                                </Card>
                            </Link>
                        </Col>
                            <Col>
                                <Link className={'text-decoration-none'} to={'admin/location'}>
                                    <Card className={'l-bg-orange-dark'}>
                                        <Card.Title className={'m-auto text-md-center'}>Lokacije</Card.Title>
                                    </Card>
                                </Link>
                            </Col></> : ''}
                </Row>
            </div>
        );
    }
}