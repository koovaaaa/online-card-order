import React from "react";
import NavBar from "./components/navBar";
import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "./components/homePage";
import LoginPage from "./components/auth/loginPage";
import RegisterPage from "./components/auth/registerPage";
import EventList from "./components/eventList";
import jwtDecode from "jwt-decode";
import Logout from "./components/auth/logoutPage";
import {getToken} from "./api/api";

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
