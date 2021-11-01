import {Component} from "react";
import api from "../../../api/api";
import {Link, Redirect} from "react-router-dom";
import {Alert} from "react-bootstrap";

export default class DeleteEvent extends Component {
    state = {
        eventId: this.props.match.params.id,
        isDeleted: false,
        errorMessage: ''
    }

    async componentDidMount() {
        try {
            const response = await api(`employee-events/delete-event/${this.state.eventId}`, 'delete', {});
            if (response) this.setState({isDeleted: true})
        } catch (e) {
            this.setState({errorMessage: e.response.data.message});
        }
    }

    render() {
        if (this.state.isDeleted) return (<Redirect to={'../events'}/>)

        return (
            <div className={'center-content justify-content-center'}>
                <Alert variant={"danger"} className={"fw-bold text-md-center"}>
                    <span>Za izabrani događaj postoje aktivne ulaznice, te ga zbog toga nije dozvoljeno obrisati!</span><br/>
                    <span>Događaj je moguće obrisati samo dok ne postoji nijedna aktivna ulaznica vezana za njega!</span><br/>
                    <Link to={'../events'}>Vrati se nazad!</Link>
                </Alert>
            </div>
        );
    }
}