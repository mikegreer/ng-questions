import React from 'react';
import MultiField from './MultiField.js';

class AddressInput extends React.Component {
    handleAnswer = (pickerOptionId) => {
        this.props.handleAnswer(this.props.data.id, pickerOptionId);
    }
    render() {
        
        return (
            <span className="address-input">
                <MultiField
                    data = {this.props.data} 
                    handleAnswer = {this.props.handleAnswer} 
                    // fieldStates = {this.props.answers[this.props.data.id]}
                />
            </span>
        );
    }
}

export default AddressInput;