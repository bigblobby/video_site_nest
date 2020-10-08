import React from 'react';
import InputField from "./InputField";

type EmailFieldProps = {
    id: string;
    value: string;
    name: string;
    onChange: (value, name) => void;
}


class EmailField extends React.Component<EmailFieldProps> {
    render() {
        return (
            <InputField
                {...this.props}
                type="email"
                onChange={this.props.onChange}
            />
        );
    }
}

export default EmailField;
