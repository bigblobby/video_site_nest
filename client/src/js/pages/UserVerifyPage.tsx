import React from 'react';
import ApiService from "../services/ApiService";

type UserVerifyPageProps = {
    match: {params}
}

type UserVerifyPageState = {
    message: string;
}

class UserVerifyPage extends React.Component<UserVerifyPageProps, UserVerifyPageState> {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        ApiService.verifyEmail(token)
            .then(result => {
                this.setState({
                    message: result.message
                });
            }).catch(error => {
                this.setState({
                    message: error.message
                });
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.message ? (
                        <p>{this.state.message}</p>
                    ) : (
                        <p>Verifying...</p>
                    )
                }
            </div>
        );
    }
}

export default UserVerifyPage;
