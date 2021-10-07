import React from "react";
import NavBar from "./components/navBar";
import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "./components/homePage";
import LoginPage from "./components/auth/loginPage";
import RegisterPage from "./components/auth/registerPage";
import EventList from "./components/eventList";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <br/>
                <Container>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/events" component={EventList}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </Container>
            </React.Fragment>
        )
            ;
    }
}

export default App;
