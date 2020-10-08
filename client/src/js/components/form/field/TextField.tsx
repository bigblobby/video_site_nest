import React from 'react';
import InputField from "./InputField";

type TextFieldProps = {
    id: string;
    value: string;
    name: string;
    onChange: (value, name) => void
}


class TextField extends React.Component<TextFieldProps> {

    render() {
        return (
            <InputField
                {...this.props}
                type="text"
                onChange={this.props.onChange}
            />
        );
    }
}

export default TextField;
