import React from 'react';
import {composeClassNames} from "../../../utilities/classnames";

type ContainerProps = {
    classNames?: string;
    mw?: 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 1100 | 1200 | 1300;
}

type ContainerState = {
    classNames: string;
}

class Container extends React.Component<ContainerProps, ContainerState> {
    constructor(props) {
        super(props);

        this.state = {
            classNames: ''
        }
    }

    componentDidMount() {
        this.convertProps(this.props);
    }

    convertProps = (props) => {
        const classNames = composeClassNames(
            props.mw && `max-width-${props.mw}`
        );

        this.setState({classNames});
    }

    render() {
        const classNames = composeClassNames('container', this.state.classNames, this.props.classNames);

        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }
}

export default Container;
