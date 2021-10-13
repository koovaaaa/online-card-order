import React from "react";
import NavBar from "./components/common/navBar";
import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "./components/homePage";
import LoginPage from "./components/auth/loginPage";
import RegisterPage from "./components/auth/registerPage";
import EventList from "./components/eventList";
import jwtDecode from "jwt-decode";
import Logout from "./components/auth/logoutPage";
import {getToken} from "./api/api";
import AdminHomePage from "./components/admin/adminHomePage";
import AdminEventList from "./components/employee/event/adminEventList";
import AddNewEvent from "./components/employee/event/addNewEvent";
import EditEvent from "./components/employee/event/editEvent";
import DeleteEvent from "./components/employee/event/deleteEvent";
import AdminUserList from "./components/admin/user/adminUserList";
import EditUser from "./components/admin/user/editUser";
import EventLocations from "./components/admin/location/eventLocations";
import AddNewCity from "./components/admin/location/addNewCity";
import EditCity from "./components/admin/location/editCity";
import UserProfile from "./components/common/userProfile";

class App extends React.Component {
    state = {}

    async componentDidMount() {
        try {
            const jwt = getToken();
            const user = jwtDecode(jwt);
            await this.setState({user})
        } catch (e) {
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar user={this.state.user}/>
                <br/>
                <Container>
                    <Switch>
                        <Route path="/profile" component={UserProfile}/>
                        <Route path="/admin/edit-city/:id" component={EditCity}/>
                        <Route path="/admin/add-new-city" component={AddNewCity}/>
                        <Route path="/admin/location" component={EventLocations}/>
                        <Route path="/admin/edit-user/:id" component={EditUser}/>
                        <Route path="/admin/users" component={AdminUserList}/>
                        <Route path="/admin/delete-event/:id" component={DeleteEvent}/>
                        <Route path="/admin/edit-event/:id" component={EditEvent}/>
                        <Route path="/admin/add-new-event" component={AddNewEvent}/>
                        <Route path="/admin/events" component={AdminEventList}/>
                        <Route path="/admin" component={AdminHomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/events" component={EventList}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </Container>
            </React.Fragment>
        );
    }
}

export default App;
