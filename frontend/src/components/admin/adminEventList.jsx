import {Component} from "react";
import {Nav} from "react-bootstrap";
import api from "../../api/api";

export default class AdminEventList extends Component {
    async componentDidMount() {
        const events = await api('http://localhost:3000/employee-events/get-events', 'get', '');
        console.log(events);
    }


    render() {
        return (
            <Nav as={"ul"}>
                <Nav.Item as={"li"}>
                    <Nav.Link>Aktivni događaji</Nav.Link>
                </Nav.Item>
                <Nav.Item as={"li"}>
                    <Nav.Link>Završeni događaji</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}