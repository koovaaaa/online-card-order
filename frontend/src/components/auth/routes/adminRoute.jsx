import {Redirect, Route} from "react-router-dom";
import {getCurrentUser} from "../../../api/api";

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                getCurrentUser() && getCurrentUser().role === 'Admin' ? <Component {...props} /> :
                    <Redirect to={'/login'}/>
            }
        />
    );
}

export default AdminRoute;