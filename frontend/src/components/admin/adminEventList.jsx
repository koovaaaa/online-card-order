import {Component} from "react";
import {Button, Table} from "react-bootstrap";
import api from "../../api/api";
import {Link} from "react-router-dom";


export default class AdminEventList extends Component {
    state = {
        events: [],
        numberOfEvents: '',
    }

    async componentDidMount() {
        const events = await api('http://localhost:3000/employee-events/get-events', 'get', '');

        await this.setState({events: events.events, numberOfEvents: events.numberOfEvents})
    }

    render() {
        return (
            <>
                <Link className="btn btn-primary" to={"add-new-event"}>Dodaj novi dogadjaj</Link>
                <br/>
                <br/>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Naziv događaja</th>
                        <th>Kategorija</th>
                        <th>Grad</th>
                        <th>Država</th>
                        <th>Datum objavljivanja</th>
                        <th>Datum održavanja</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events.map(event =>
                        <tr key={event.eventId}>
                            <td>{event.eventId}</td>
                            <td>{event.eventName}</td>
                            <td>{event.category.categoryName}</td>
                            <td>{event.city.cityName}</td>
                            <td>{event.country.countryName}</td>
                            <td>{event.createdAt}</td>
                            <td>{event.eventDate}</td>
                            <td><Button>Pregledaj</Button></td>
                            <td><Button variant={"outline-warning"}>Izmijeni</Button></td>
                            <td><Button variant={"outline-danger"}>Obriši</Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <i>Ukupan broj događaja: {this.state.numberOfEvents}</i>
            </>
        );
    }
}