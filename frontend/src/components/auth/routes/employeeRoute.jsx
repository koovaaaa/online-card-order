import {Redirect, Route} from "react-router-dom";
import {getCurrentUser} from "../../../api/api";

const EmployeeRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                getCurrentUser() && (getCurrentUser().role === 'Admin' || getCurrentUser().role === 'Zaposleni') ?
                    <Component {...props} /> :
                    <Redirect to={'/login'}/>
            }
        />
    );
}

export default EmployeeRoute;