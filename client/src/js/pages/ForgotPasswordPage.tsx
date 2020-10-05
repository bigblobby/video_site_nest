import React from 'react';
import ApiService from "../services/ApiService";

type ForgotPasswordPageState = {
    email: string;
    successMessage: string;
    errorMessages: [];
}

class ForgotPasswordPage extends React.Component<{}, ForgotPasswordPageState> {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            successMessage: '',
            errorMessages: []
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        ApiService.requestPasswordReset({
            email: this.state.email
        }).then(result => {
            this.setState({
                successMessage: result.message
            });
        }).catch(err => {
            this.setState({
                errorMessages: err.message
            })
        });
    }

    render() {
        return (
            <div className="forgot-password-page">
                <div className="container">
                    <div className="card max-width-500">
                        <div className="card__header">
                            <h3 className="card__title">Forgot your password?</h3>
                            <p>Enter the email address associated with your account and we will send you a link to reset your password.</p>
                        </div>
                        <div className="card__body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group mb-4">
                                    <label htmlFor="email">Email address *</label>
                                    <input className="form-control" type="email" id="email" />
                                </div>

                                <button className="btn btn-primary w-100 justify-content-center">Request password reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPasswordPage;
