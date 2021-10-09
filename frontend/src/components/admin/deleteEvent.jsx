import {Component} from "react";
import api from "../../api/api";
import {Redirect} from "react-router-dom";

export default class DeleteEvent extends Component {
    state = {
        eventId: this.props.match.params.id,
        isDeleted: false
    }

    async componentDidMount() {
        const response = await api(`employee-events/delete-event/${this.state.eventId}`, 'delete', {});
        if (response) this.setState({isDeleted: true})
    }

    render() {
        if (this.state.isDeleted) return (<Redirect to={'../events'}/>)

        return null;
    }
}