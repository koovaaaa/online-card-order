import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    return (

        <Navbar bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/"> <FontAwesomeIcon icon={faHome}/> Home</Link>
                <Nav className="me-auto">
                    <Link className="nav-link" to="/contact">Kontakt</Link>
                    <Link className="nav-link" to="/login">Prijava</Link>
                    <Link className="nav-link" to="/register">Registracija</Link>
                </Nav>
            </Container>
        </Navbar>


    )
}

export default NavBar;