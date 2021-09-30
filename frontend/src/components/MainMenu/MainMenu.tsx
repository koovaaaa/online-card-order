import React from "react";
import {Container, Nav} from "react-bootstrap";
import {HashRouter,Link } from "react-router-dom";

export class MainMenuItem {
    text: string = '';
    link: string = '#';

    constructor(text: string, link: string) {
        this.text = text;
        this.link = link;
    }
}

interface MainMenuProperties{
    items: MainMenuItem[];
}

export class MainMenu extends React.Component <MainMenuProperties>{
    // constructor(props: MainMenuProperties | Readonly<MainMenuProperties>) {
    //     super(props);
    // }

    render() {
        return(
            <Container>
                <Nav variant="tabs">
                    <HashRouter>
                        {this.props.items.map(this.makeNavLink)}
                    </HashRouter>
                </Nav>
            </Container>
        );
    }

    private makeNavLink(item: MainMenuItem){
        return (
            <Link to={item.link} className="nav-link"> { item.text }</Link>
        );
    }
}