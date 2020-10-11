import React from 'react';
import ReactDOM from 'react-dom';
const modal = document.getElementById('modal-mount');

type ModalState = {
    mounted: boolean;
}

class ModalPortal extends React.Component<any, ModalState> {
    private readonly el: HTMLElement;

    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
        }

        this.el = document.createElement('div');
    }

    componentDidMount() {
        modal.appendChild(this.el);
        this.setState({
            mounted: true
        });
    }

    componentWillUnmount() {
        if (this.el) {
            modal.removeChild(this.el);
        }
    }

    render() {
        return ReactDOM.createPortal(
            this.state.mounted ? this.props.children : null,
            this.el
        );
    }
}

export default ModalPortal;
