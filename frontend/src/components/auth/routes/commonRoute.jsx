import {Redirect, Route} from "react-router-dom";
import {getCurrentUser} from "../../../api/api";

const CommonRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                getCurrentUser() ? <Component {...props} /> :
                    <Redirect to={'/login'}/>
            }
        />
    );
}

export default CommonRoute;