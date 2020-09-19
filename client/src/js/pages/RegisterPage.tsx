import React from 'react';
import { userRegister } from "../actions/userActions";
import { connect } from "react-redux";

type RegisterPageState = {
    email: string;
    password: string;
}

type RegisterPageProps = {
    userRegister: (data) => {}
}
class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.userRegister({
            email: this.state.email,
            password: this.state.password
        });
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        } as { [K in keyof RegisterPageState]: RegisterPageState[K] } );
    };

    render(){
        return (
            <div className="register-page">
                <div className="register-container">
                    <h1>Register for free</h1>

                    <form onSubmit={ this.handleSubmit }>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input className="form-control" type="email" name="email" id="email" onChange={ this.handleChange }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={ this.handleChange }/>
                        </div>

                        <button className="btn btn-primary w-100" type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({userReducer}) => {
    const {user, error} = userReducer;
    return {
        user,
        error
    }
};

const mapDispatchToProps = { userRegister };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
