import React from 'react';

class TextInput extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            fieldActive: false
        }
    }

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    render() {
         return(
             <span>
                <label>{this.props.label}</label>
                <input
                    type="text"
                    label={this.props.label}
                    onChange={this.handleInputChange}
                ></input>
            </span>
        );
    }
}

export default TextInput;