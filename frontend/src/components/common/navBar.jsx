import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {getCurrentUser} from "../../api/api";
import Cart from "../user/cart";

const NavBar = () => {
    const userRole = {
        admin: 'Admin',
        employee: 'Zaposleni',
        user: 'Korisnik'
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {(!getCurrentUser() || (getCurrentUser() && getCurrentUser().role === userRole.user)) &&
                <Link className="navbar-brand" to="/"> <FontAwesomeIcon icon={faHome}/> Početna strana</Link>}
                {getCurrentUser() && (getCurrentUser().role === userRole.admin || getCurrentUser().role === userRole.employee) &&
                <Link className="navbar-brand" to="/employee"> <FontAwesomeIcon icon={faHome}/> Početna strana</Link>}
                <Nav className={"me-auto"}>
                    {(!getCurrentUser() || (getCurrentUser() && getCurrentUser().role === userRole.user)) &&
                    <Link className="nav-link" to="/events">Lista događaja</Link>}
                    {(getCurrentUser() && getCurrentUser().role === userRole.user) &&
                    <Link className="nav-link" to="/my-orders">Moje narudžbe</Link>}
                    {(getCurrentUser() && (getCurrentUser().role === userRole.admin || getCurrentUser().role === userRole.employee)) &&
                    <Link className="nav-link" to="/employee/events">Događaji</Link>}
                    {(getCurrentUser() && (getCurrentUser().role === userRole.admin || getCurrentUser().role === userRole.employee)) &&
                    <Link className="nav-link" to="/employee/orders">Narudžbe</Link>}
                    {(getCurrentUser() && getCurrentUser().role === userRole.admin) &&
                    <Link className="nav-link" to="/admin/users">Korisnici</Link>}
                    {(getCurrentUser() && getCurrentUser().role === userRole.admin) &&
                    <Link className="nav-link" to="/admin/location">Lokacije</Link>}
                </Nav>
                <Nav>
                    {(getCurrentUser() && getCurrentUser().role === userRole.user) &&
                    <Cart/>}
                    {!getCurrentUser() &&
                    <>
                        <Link className="nav-link" to="/login">Prijava</Link>
                        <Link className="nav-link" to="/register">Registracija</Link>
                    </>}
                    {getCurrentUser() &&
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