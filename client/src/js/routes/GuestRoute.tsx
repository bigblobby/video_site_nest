import React from 'react';
import { Route } from 'react-router'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { verifyToken } from "../actions/userActions";

type GuestRouteProps = {
    verifyToken: () => {},
    location: {},
    user: {},
    component: Element
    verify: boolean
}

class GuestRoute extends React.Component<GuestRouteProps, {}> {
    componentDidMount() {
        if(this.props.verify){
            this.props.verifyToken();
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
