import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({user}) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {(!user || (user && user.role === 'user')) &&
                <Link className="navbar-brand" to="/"> <FontAwesomeIcon icon={faHome}/> Početna strana</Link>}
                {user && user.role === 'admin' &&
                <Link className="navbar-brand" to="/admin"> <FontAwesomeIcon icon={faHome}/> Početna strana</Link>}
                <Nav className="me-auto">
                    {(!user || (user && user.role === 'user')) &&
                    <Link className="nav-link" to="/events">Lista događaja</Link>}
                    {((user && user.role === 'admin')) &&
                    <Link className="nav-link" to="/admin/events">Događaji</Link>}

                    {!user &&
                    <>
                        <Link className="nav-link" to="/login">Prijava</Link>
                        <Link className="nav-link" to="/register">Registracija</Link>
                    </>}
                    {user &&
                    <>
                        <Link className="nav-link" to="/profile">Moj profil</Link>
                        <Link className="nav-link" to="/logout">Odjavi se</Link>
                    </>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;