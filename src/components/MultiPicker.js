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
            <span
                className={pickerClasses}
                onClick={(optionKey) => this.props.handleClick(this.props.optionKey)
            }>
                <img src={"./images/icons/" + this.props.optionData.image} alt=""></img>
                <p>{this.props.optionData.label}</p>
                <p>{this.props.optionData.sublabel}</p>
            </span>
        );
    }
}

class MultiPicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pickerOptions : {},
        }
    }

    componentDidMount() {
        let pickerOptionData = {};
        if(this.props.data.options){
            this.props.data.options.forEach((option, id) => {
                pickerOptionData[option.value] = false;
            });
            pickerOptionData = Object.assign({}, pickerOptionData, this.props.currentAnswer);
            this.setState({pickerOptions : pickerOptionData});
        }
    }

    handleClick = (optionKey) => {
        const currentlySelected = this.state.pickerOptions[optionKey];
        console.log(currentlySelected);
        var updatedPickerOptions = Object.assign({}, this.state.pickerOptions, {[optionKey]: !currentlySelected});
        this.setState({pickerOptions : updatedPickerOptions});
    }

    submitAnswer = () => {
        this.props.handleAnswer(this.state.pickerOptions);
    }

    render() {
        //TODO: make button label say 'none apply' until something has been selected, then 'continue'
        // const buttonLabel = this.props.data.buttonLabel ? this.props.data.buttonLabel : 'nope';
        const buttonLabel = "continue";
        const options = [];    
        this.props.data.options.forEach((option, id) => {
            const optionKey = option.value;
            options.push(
                <PickerOption
                    optionData = {option}
                    optionKey = {optionKey}
                    handleClick = {(optionKey) => this.handleClick(optionKey)}
                    selected = {this.state.pickerOptions[optionKey]}
                />
            )
        });
        const multiStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
        return (
            <span className="multipicker" style={multiStyle}>
                <span className="picker">
                    {options}  
                </span>
                <span>
                    <input
                        className = "form-button"
                        type = "submit"
                        value = {buttonLabel} 
                        onClick = {() => this.submitAnswer()}
                    />  
                </span>
            </span>
        );
    }
}

export default MultiPicker;