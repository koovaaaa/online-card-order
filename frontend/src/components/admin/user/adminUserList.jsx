import {Component} from "react";
import {Card, Table} from "react-bootstrap";
import api from "../../../api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../common/pagination";


export default class AdminUserList extends Component {
    state = {
        users: [],
        numberOfUsers: '',
        defaultPerPage: ''
    }

    async componentDidMount() {
        const users = await api('admin/users/get-users', 'get', '');
        await this.setState({
            users: users.users,
            numberOfUsers: users.numberOfUsers,
            defaultPerPage: users.defaultPerPage,
            currentPage: 1
        });
    }

    handlePageChange = async (page) => {
        await this.setState({currentPage: page})
        const users = await api(`admin/users/get-users?page=${this.state.currentPage}`, 'get', '');
        await this.setState({users: users.users, numberOfUsers: users.numberOfUsers});
    }

    render() {
        return (
            <Card>
                <Table striped borderless hover>
                    <thead className={'border-bottom'}>
                    <tr>
                        <th className={"text-md-center"}>#</th>
                        <th className={"text-md-center"}>Ime</th>
                        <th className={"text-md-center"}>Prezime</th>
                        <th className={"text-md-center"}>Username</th>
                        <th className={"text-md-center"}>Email</th>
                        <th className={"text-md-center"}>Telefon</th>
                        <th className={"text-md-center"}>Adresa</th>
                        <th className={"text-md-center"}>Grad</th>
                        <th className={"text-md-center"}>Država</th>
                        <th className={"text-md-center"}>Uloga</th>
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
                            <td className={"text-md-center"}><Link className="btn btn-warning"
                                                                   to={`edit-user/${user.userId}`}><FontAwesomeIcon
                                icon={faEdit}/></Link>
                            </td>
                        </tr>)
                    }
                    </tbody>
                </Table>
                <br/>
                <Pagination eventsCount={this.state.numberOfUsers} pageSize={this.state.defaultPerPage}
                            currentPage={this.state.currentPage} onPageChange={this.handlePageChange}/>
            </Card>

        );
    }
}