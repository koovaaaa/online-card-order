import {Component} from "react";
import api from "../../../api/api";
import {Link, Redirect} from "react-router-dom";
import {Alert} from "react-bootstrap";

export default class DeleteTicket extends Component {
    state = {
        eventId: this.props.match.params.eventId,
        ticketId: this.props.match.params.id,
        isDeleted: false,
        errorMessage: ''
    }

    async componentDidMount() {
        try {
            const {ticketId} = this.state;
            const response = await api(`employee-ticket/delete-ticket/${ticketId}`, 'delete', {});
            if (response) this.setState({isDeleted: true});
        } catch (e) {
            this.setState({errorMessage: e.response.data.message});
        }
    }


    render() {
        const {isDeleted} = this.state;
        const {state} = this.props.location;
        if (isDeleted) return (<Redirect to={state.from.pathname}/>)
        return (
            <div className={'justify-content-center align-items-center'}>
                <Alert variant={"danger"} className={"fw-bold text-md-center"}>
                    <span>Za željenu ulaznicu postoje narudbže, te je zbog toga nije moguće obrisati!</span><br/>
                    <Link to={state.from.pathname}>Vrati se nazad!</Link>
                </Alert>
            </div>
        );
    }
}