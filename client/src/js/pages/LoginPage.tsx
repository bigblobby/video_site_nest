import React from 'react';
import { connect } from "react-redux";
import { userLogin } from "../actions/userActions";

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
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input className="form-control" type="email" name="email" id="email" onChange={ this.handleChange }/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password">Password *</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={ this.handleChange }/>
                        </div>

                        <button className="btn btn-primary w-100" type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({userReducer}) => {
    const {user, error, prevUrl} = userReducer;
    return {
        user,
        error,
        prevUrl
    }
};

const mapDispatchToProps = { userLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
