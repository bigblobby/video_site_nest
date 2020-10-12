import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../actions/userActions";
import Container from "../components/common/layout/Container";
import EmailField from "../components/form/field/EmailField";
import PasswordField from "../components/form/field/PasswordField";
import {addNotification} from "../actions/snackbarActions";
import {INotification} from "../interfaces/notification";

type LoginPageState = {
    email: string;
    password: string;
}

type LoginPageProps = {
    user: {};
    location: { state: { from } };
    userLogin: (user, url) => {};
    prevUrl: string;
    addNotification: (data: INotification) => void
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.userLogin({
            email: this.state.email,
            password: this.state.password
        }, this.props.prevUrl);
    };

    handleChange = (value, name) => {
        this.setState({
            [name]: value
        } as { [K in keyof LoginPageState]: LoginPageState[K] } );
    };

    add = (type) => {
        let key = Math.random().toString(36).substr(2, 9);
        this.props.addNotification({
            key: key,
            type: type,
            message: `This is a message ${key}`,
            duration: 3000
        });
    }

    render(){
        return (
            <div className="login-page">
                <Container mw={500}>
                    <div className="card">
                        <div className="card__main">
                            <h1 className="mb-3 text-center">Log In</h1>
                            <button onClick={() => this.add('success')}>add</button>
                            <button onClick={() => this.add('info')}>add</button>
                            <button onClick={() => this.add('warning')}>add</button>
                            <button onClick={() => this.add('error')}>add</button>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <EmailField id="email" value={this.state.email} name="email" onChange={this.handleChange} />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password">Password *</label>
                                    <PasswordField id="password" value={this.state.password} name="password" onChange={this.handleChange} />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <Link className="btn-link" to={"forgot-password"}><small>Forgot your password?</small></Link>
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </form>
                        </div>

                        <div className="card__outer-footer">
                            <p>Dont have an account? <Link className="btn-link" to={"/register"}>Create one</Link></p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = ({userReducer, appReducer}) => {
    const {user, error} = userReducer;
    const {prevUrl} = appReducer;
    return {
        user,
        error,
        prevUrl
    }
};

const mapDispatchToProps = { userLogin, addNotification };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
