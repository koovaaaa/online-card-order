import React from "react";
import {Card, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";

export default class ContactPage extends React.Component {
    render() {
        return(
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faPhone } /> Contact details
                        </Card.Title>
                        <Card.Text>
                            Contact details will be show here..
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}