import React from 'react';
import Api from '../services/ApiService';

type UserChannelPageProps = {
    match: {params}
}

type UserChannelPageState = {
    id: string;
    username: string;
    email: string;
}

class UserChannelPage extends React.Component<UserChannelPageProps, UserChannelPageState> {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            username: '',
            email: ''
        }
    }

    componentDidMount() {
        Api.getUserChannel({
            username: this.props.match.params.username
        }).then(result => {
            this.setState({
                id: result.user.id,
                username: result.user.username,
                email: result.user.email
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <h1>Channel</h1>
                <p>ID: {this.state.id}</p>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
            </div>
        );
    }
}

export default UserChannelPage;
