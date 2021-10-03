import React from "react";
import {Container, Dropdown, DropdownButton} from "react-bootstrap";
import api from "../api/api";

export class HomePage extends React.Component {
    state = {
        categories: [],
        countries: []
    }

    async componentDidMount() {
        const categories = await api('user-event/get-categories', 'get', '');
        const countries = await api('user-place/get-countries', 'get', '');
        console.log(categories);
        console.log(countries);
        this.setState({
            categories, countries
        })
    }

    render() {
        return (
            <Container>
                <DropdownButton title="Izaberite kategoriju">
                    {this.state.categories.map(category => <Dropdown.Item> {category.categoryName} </Dropdown.Item>)}
                </DropdownButton>
            </Container>
        );
    }
}