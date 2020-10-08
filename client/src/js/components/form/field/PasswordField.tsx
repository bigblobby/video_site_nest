import React from 'react';
import InputField from "./InputField";

type PasswordFieldProps = {
    id: string;
    value: string;
    name: string;
    onChange: (value, name) => void;
}


class PasswordField extends React.Component<PasswordFieldProps> {
    render() {
        return (
            <InputField
                {...this.props}
                type="password"
                onChange={this.props.onChange}
            />
        );
    }
}

export default PasswordField;
