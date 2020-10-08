import React from 'react';

type InputFieldProps = {
    id: string;
    value: string;
    onChange: (value, name) => void;
    type: string;
    autocomplete?: string;
    placeholder?: string;
    name: string;
    required?: boolean;
}

class InputField extends React.Component<InputFieldProps> {

    onChange = (e) => {
        const value = e.target.value;
        this.props.onChange(value, this.props.name);
    }

    render() {
        return (
            <input
                id={this.props.id}
                type={this.props.type}
                onChange={this.onChange}
                required={this.props.required}
                value={this.props.value}
                className="form-control"
                placeholder={this.props.placeholder || null}
                name={this.props.name}
                autoComplete={this.props.autocomplete || ''}
            />
        );
    }
}

export default InputField;
