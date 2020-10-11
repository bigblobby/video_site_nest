import React from 'react';
import { connect } from 'react-redux';
import {INotification} from "../interfaces/notification";
import {timer} from "../utilities/helpers";
import {removeNotification} from "../actions/snackbarActions";
import TickIcon from "./common/icons/TickIcon";
import ErrorIcon from "./common/icons/ErrorIcon";
import WarningIcon from "./common/icons/WarningIcon";
import InfoIcon from "./common/icons/InfoIcon";

type NotificationProps = {
    item: INotification;
    removeNotification: (key) => void;
}

type NotificationState = {
    fadeIn: boolean;
    fadeOut: boolean;
}

class Notification extends React.Component<NotificationProps, NotificationState> {
    constructor(props) {
        super(props);

        this.state = {
            fadeIn: false,
            fadeOut: false,
        }
    }

    async componentDidMount() {
        setTimeout(() => {
            this.setState({
                fadeIn: true
            });
        }, 20)

        setTimeout(() => {
            this.setState({
                fadeOut: true
            });
        }, this.props.item.duration - 200)
    }

    removeNotification = (key) => {
        this.setState({fadeOut: true}, () => {
            timer(300).then(() => {
                this.props.removeNotification(key);
            });
        });
    }

    getIcon = (type) => {
        switch(type){
            case 'error':
                return <ErrorIcon />;
            case 'warning':
                return <WarningIcon />
            case 'info':
                return <InfoIcon />
            case 'success':
                return <TickIcon />
        }
    }

    render() {
        const {item} = this.props;

        return (
            <div className={`notification notification--${item.type} ${this.state.fadeIn ? 'fadeIn' : ''} ${this.state.fadeOut ? 'fadeOut' : ''}`}>
                {this.getIcon(item.type)}
                {item.message}
                <span className="notification__close" onClick={() => this.removeNotification(item.key)}>&#10005;</span>
            </div>
        );
    }
}

const mapDispatchToProps = {removeNotification};

export default connect(null, mapDispatchToProps)(Notification);
