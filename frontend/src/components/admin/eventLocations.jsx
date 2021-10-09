import {Component} from "react";
import {Alert, Col, Row, Table} from "react-bootstrap";
import api from "../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

export default class EventLocations extends Component {
    state = {
        countries: [],
        cities: []
    }

    async componentDidMount() {
        const countries = await api('admin/places/country/get-countries', 'get', '');
        await this.setState({countries});
    }

    async onMenuClick(event) {
        const countryId = event.target.value;
        const cities = await api(`admin/places/city/get-cities-from-country/${countryId}`, 'get', '');
        await this.setState({cities});
    }

    render() {
        return (
            <Row>
                <Col xs={3}>
                    <ul className={"nav nav-tabs flex-column"}>
                        {this.state.countries.map(country =>
                            <li key={country.countryId} className={"nav-item"}>
                                <button className={"nav-link "} value={country.countryId}
                                        onClick={event => this.onMenuClick(event)}>{country.countryName}</button>
                            </li>
                        )}
                    </ul>
                    <br/>
                    <Link className="btn btn-primary" to={"add-new-city"}><FontAwesomeIcon icon={faPlus}/> Dodaj novi
                        grad</Link>
                </Col>
                <Col xs={4}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Poštanski broj</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.cities.map(city =>
                            <tr key={city.cityId}>
                                <td>{city.cityId}</td>
                                <td>{city.cityName}</td>
                                <td>{city.postalCode}</td>
                                <td><Link className="btn btn-warning"
                                          to={`edit-city/${city.cityId}`}><FontAwesomeIcon
                                    icon={faEdit}/></Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <br/>
                    <Alert variant="warning" className={!this.state.cities.length ? '' : 'd-none'}>
                        {'Izaberite državu!'}
                    </Alert>
                </Col>
            </Row>
        );
    }
}