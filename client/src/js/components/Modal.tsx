import React from 'react';
import ModalPortal from "./portal/ModalPortal";

type ModalProps = {
    toggle: (e: any) => void;
    visible: boolean;
}

class Modal extends React.Component<ModalProps, {}> {
    render() {
        if(!this.props.visible) return null;

        return (
            <ModalPortal>
                <div className="modal">
                    <div className="modal__overlay" onClick={this.props.toggle}></div>
                    <div className="modal__content">
                        <div className="modal__close" onClick={this.props.toggle}>&#10005;</div>
                        {this.props.children}
                    </div>
                </div>
            </ModalPortal>
        );
    }
}

export default Modal;
