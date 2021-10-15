import React from "react";
import NavBar from "./components/common/navBar";
import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "./components/guest/homePage";
import LoginPage from "./components/auth/loginPage";
import RegisterPage from "./components/auth/registerPage";
import EventList from "./components/guest/eventList";
import Logout from "./components/auth/logoutPage";
import AdminEmployeeHomePage from "./components/employee/adminEmployeeHomePage";
import AdminEmployeeEventList from "./components/employee/event/adminEmployeeEventList";
import AddNewEvent from "./components/employee/event/addNewEvent";
import EditEvent from "./components/employee/event/editEvent";
import DeleteEvent from "./components/employee/event/deleteEvent";
import AdminUserList from "./components/admin/user/adminUserList";
import EditUser from "./components/admin/user/editUser";
import EventLocations from "./components/admin/location/eventLocations";
import AddNewCity from "./components/admin/location/addNewCity";
import EditCity from "./components/admin/location/editCity";
import UserProfile from "./components/common/userProfile";
import AdminRoute from "./components/auth/routes/adminRoute";
import EmployeeRoute from "./components/auth/routes/employeeRoute";
import CommonRoute from "./components/auth/routes/commonRoute";
import {EventPage} from "./components/guest/eventPage";
import UserRoute from "./components/auth/routes/userRoute";
import {TicketsPage} from "./components/user/ticketsPage";
import AdminEmployeeEventPage from "./components/employee/event/adminEmployeeEventPage";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <br/>
                <Container>
                    <Switch>
                        <UserRoute path="/event/:id/tickets" component={TicketsPage}/>
                        <CommonRoute path="/profile" component={UserProfile}/>
                        <AdminRoute path="/admin/edit-city/:id" component={EditCity}/>
                        <AdminRoute path="/admin/add-new-city" component={AddNewCity}/>
                        <AdminRoute path="/admin/location" component={EventLocations}/>
                        <AdminRoute path="/admin/edit-user/:id" component={EditUser}/>
                        <AdminRoute path="/admin/users" component={AdminUserList}/>
                        <EmployeeRoute path="/employee/event/:id" component={AdminEmployeeEventPage}/>
                        <EmployeeRoute path="/employee/delete-event/:id" component={DeleteEvent}/>
                        <EmployeeRoute path="/employee/edit-event/:id" component={EditEvent}/>
                        <EmployeeRoute path="/employee/add-new-event" component={AddNewEvent}/>
                        <EmployeeRoute path="/employee/events" component={AdminEmployeeEventList}/>
                        <EmployeeRoute path="/employee" component={AdminEmployeeHomePage}/>
                        <Route path="/event/:id" component={EventPage}/>
                        <Route path="/events" component={EventList}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </Container>
            </React.Fragment>
        );
    }
}

export default App;
