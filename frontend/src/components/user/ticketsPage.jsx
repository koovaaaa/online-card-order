import {Component} from "react";

export class TicketsPage extends Component {
    state = {
        eventId: this.props.match.params.id
    }

    render() {
        return 'Ulaznice..' + this.state.eventId;
    }
}