import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const loggedIn = useSelector(state => !!state.session.user);
    const history = useHistory();

    // if logged in - show component, else if not logged in, stay on current page
    // if on reservations page and logged in and then logout, redirect to "/"

    return(
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};