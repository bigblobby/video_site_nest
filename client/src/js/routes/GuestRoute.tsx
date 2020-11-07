import React from 'react';
import { Route } from 'react-router'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { verifyToken } from "../actions/userActions";

type GuestRouteProps = {
    verifyToken: (shouldRedirect) => {},
    location: {},
    user: {},
    component: Element
    verify: boolean,
    redirect: boolean,
}

class GuestRoute extends React.Component<GuestRouteProps, {}> {
    static defaultProps = {
        redirect: false
    }

    componentDidMount() {
        if(this.props.verify){
            this.props.verifyToken(this.props.redirect);
        }
    }

    render() {
        const { user, location, component: Component } = this.props;

        if(user){
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: location }
                }} />
            )
        }
        return (
            <Route
                {...this.props}
                render={props => {
                    // @ts-ignore
                    return <Component {...props} />
                }}
            />
        );
    }
}

const mapStateToProps = ({userReducer}) => {
    const { user } = userReducer;
    return {
        user
    }
};

const mapDispatchToProps = { verifyToken };

export default connect(mapStateToProps, mapDispatchToProps)(GuestRoute);
