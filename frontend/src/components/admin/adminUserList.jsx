import {Component} from "react";
import {Table} from "react-bootstrap";
import api from "../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

export default class AdminUserList extends Component {
    state = {
        users: []
    }

    async componentDidMount() {
        const users = await api('admin/users/get-users', 'get', '');
        await this.setState({users});
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>Adresa</th>
                    <th>Grad</th>
                    <th>Država</th>
                    <th>Uloga</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map(user =>
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.contactPhone}</td>
                        <td>{user.address}</td>
                        <td>{user.city.cityName}</td>
                        <td>{user.country.countryName}</td>
                        <td>{user.role}</td>
                        <td><Link className="btn btn-warning"
                                  to={`edit-user/${user.userId}`}><FontAwesomeIcon
                            icon={faEdit}/></Link>
                        </td>
                    </tr>)
                }
                </tbody>
                <br/>
            </Table>
        );
    }
}