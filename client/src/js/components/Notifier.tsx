import React from 'react';
import { connect } from 'react-redux';
import {INotification} from "../interfaces/notification";
import {removeNotification} from "../actions/snackbarActions";

type NotifierProps = {
    list: INotification[],
    removeNotification: (key) => void;
}

class Notifier extends React.Component<NotifierProps> {
    render() {
        return (
            <div className="notifier">
                {
                    this.props.list.map(item => {
                        return (
                            <div className={"notification " + (item.type)}>
                                {item.message}
                                <span className="notification__close" onClick={() => this.props.removeNotification(item.key)}>&#10005;</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = ({snackbarReducer}) => {
    const {list} = snackbarReducer;
    return {
        list
    }
}

const mapDispatchToProps = {removeNotification};

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
