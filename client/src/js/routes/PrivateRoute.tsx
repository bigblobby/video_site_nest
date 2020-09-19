import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { verifyToken, setPrevUrl } from "../actions/userActions";

type PrivateRouteProps = {
    verifyToken: () => {};
    setPrevUrl: (url) => {};
    location: {pathname};
    user: {};
    authenticated: boolean;
    component: Element;
}

class PrivateRoute extends React.Component<PrivateRouteProps, {}> {

    componentDidMount() {
        this.props.verifyToken();
        this.props.setPrevUrl(this.props.location.pathname);
    }

    render() {
        const { authenticated, component: Component } = this.props;

        return (
            <Route
                {...this.props}
                render={props => {
                    return (
                        authenticated
                            ?
                            // @ts-ignore
                            <Component {...props} />
                            : (
                                <Redirect to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }} />
                            )
                    )
                }}
            />
        );
    }
}

const mapStateToProps = ({userReducer}) => {
    const { user, authenticated } = userReducer;
    return {
        user,
        authenticated
    }
};

const mapDispatchToProps = { verifyToken, setPrevUrl };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
