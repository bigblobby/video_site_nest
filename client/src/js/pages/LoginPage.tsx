import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../actions/userActions";
import Container from "../components/common/layout/Container";

type LoginPageState = {
    email: string;
    password: string;
}

type LoginPageProps = {
    user: {};
    location: { state: { from } };
    userLogin: (user, url) => {};
    prevUrl: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.userLogin({
            email: this.state.email,
            password: this.state.password
        }, this.props.prevUrl);
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        } as { [K in keyof LoginPageState]: LoginPageState[K] } );
    };

    render(){
        return (
            <div className="login-page">
                <Container mw={500}>
                    <div className="card">
                        <div className="card__main">
                            <h1 className="mb-3 text-center">Log In</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input className="form-control" type="email" name="email" id="email" onChange={ this.handleChange }/>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password">Password *</label>
                                    <input className="form-control" type="password" name="password" id="password" onChange={ this.handleChange }/>
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

const mapDispatchToProps = { userLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
