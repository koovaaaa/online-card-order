import {Component} from "react";
import {Alert, Col, Row, Table} from "react-bootstrap";
import api from "../../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../common/pagination";

export default class EventLocations extends Component {
    state = {
        countries: [],
        cities: [],
        numberOfCities: 0,
        citiesPerPage: '',
        currentPage: 1,
        currentCountry: ''
    }

    async componentDidMount() {
        const countries = await api('admin/places/country/get-countries', 'get', '');
        await this.setState({countries});
    }

    async onMenuClick(event) {
        const countryId = event.target.value;
        const cities = await api(`admin/places/city/get-cities-from-country/${countryId}`, 'get', '');
        await this.setState({
            cities: cities.cities,
            numberOfCities: cities.numberOfCities,
            citiesPerPage: cities.defaultPerPage,
            currentPage: 1,
            currentCountry: countryId
        });
    }

    handlePageChange = async (page) => {
        await this.setState({currentPage: page})
        const cities = await api(`admin/places/city/get-cities-from-country/${this.state.currentCountry}?page=${this.state.currentPage}`, 'get', '');

        await this.setState({cities: cities.cities, numberOfCities: cities.numberOfCities});
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
                            <th className={"text-md-center"}>#</th>
                            <th className={"text-md-center"}>Naziv</th>
                            <th className={"text-md-center"}>Poštanski broj</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.cities.map(city =>
                            <tr key={city.cityId}>
                                <td>{city.cityId}</td>
                                <td>{city.cityName}</td>
                                <td>{city.postalCode}</td>
                                <td className={"text-md-center"}><Link className="btn btn-warning"
                                                                       to={`edit-city/${city.cityId}`}><FontAwesomeIcon
                                    icon={faEdit}/></Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <br/>
                    {this.state.cities.length ?
                        <Pagination eventsCount={this.state.numberOfCities} pageSize={this.state.citiesPerPage}
                                    currentPage={this.state.currentPage} onPageChange={this.handlePageChange}/> : ''}
                    <br/>
                    <Alert variant="warning" className={!this.state.cities.length ? '' : 'd-none'}>
                        {'Izaberite državu!'}
                    </Alert>
                </Col>
            </Row>
        );
    }
}