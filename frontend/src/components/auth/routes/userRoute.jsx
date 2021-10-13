import {Redirect, Route} from "react-router-dom";
import {getCurrentUser} from "../../../api/api";

const UserRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                getCurrentUser() && getCurrentUser().role === 'Korisnik' ? <Component {...props} /> :
                    <Redirect to={'/login'}/>
            }
        />
    );
}

export default UserRoute;