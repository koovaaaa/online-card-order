import {Component} from "react";
import {removeToken} from "../../api/api";

class Logout extends Component {
    componentDidMount() {
        removeToken();

        window.location = '/';
    }

    render() {
        return null;
    }
}

export default Logout;