import React from 'react';
import { connect } from 'react-redux';
import {INotification} from "../interfaces/notification";
import Notification from "./Notification";

type NotifierProps = {
    list: INotification[];
}

class Notifier extends React.Component<NotifierProps> {
    render() {
        return (
            <div className="notifier">
                {
                    this.props.list.map(item => {
                        return <Notification key={item.key} item={item} />
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

export default connect(mapStateToProps, null)(Notifier);
