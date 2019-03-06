import React from 'react';
import './picker.css';
import classNames from 'classnames';

class PickerOption extends React.Component {
    render() {
        var pickerClasses = classNames({
            'picker-option': true,
            'selected': this.props.selected,
        })
        return (
            <span className={pickerClasses} onClick={() => this.props.handleAnswer(this.props.id)}>
                <img src={"./images/icons/" + this.props.optionData.image} alt=""></img>
                <p>{this.props.optionData.label}</p>
                <p>{this.props.optionData.sublabel}</p>
            </span>
        );
    }
}
class Picker extends React.Component {
    render() {
        const options = [];
        this.props.data.options.forEach((option, id) => {
            options.push(
                <PickerOption
                    optionData = {option}
                    key = {id}
                    id = {id}
                    handleAnswer = {() => this.props.handleAnswer(id)}
                    selected = {this.props.currentAnswer === id}
                />
            )
        })
        return (
            <span className="picker">{options}</span>
        );
    }
}

export default Picker;