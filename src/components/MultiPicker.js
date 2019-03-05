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
            <span className={pickerClasses} onClick={() => this.props.handleClick(this.props.id)}>
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
            pickerOptions : [],
        }
    }

    componentDidMount() {
        const pickerOptionData = [];
        console.log(this.props.data.options);
        console.log(this.props.currentAnswer);
        
        if(this.props.data.options){
            this.props.data.options.forEach((option, id) => {
                pickerOptionData.push(
                    {
                        label: option.label,
                        selected: false
                    }
                );
            });
            this.setState({pickerOptions : pickerOptionData});
        }
    }

    handleClick = (pickerOptionId) => {
        const pickerOptions = this.state.pickerOptions.slice();
        pickerOptions[pickerOptionId].selected = !pickerOptions[pickerOptionId].selected;
        this.setState({pickerOptions : pickerOptions});
    }

    submitAnswer = () => {
        this.props.handleAnswer(this.props.data.id, this.state.pickerOptions);
    }

    render() {
        //TODO: make button label say 'none apply' until something has been selected, then 'continue'
        const buttonLabel = this.props.data.buttonLabel ? this.props.data.buttonLabel : 'none apply';
        const options = [];
        console.log(this.state);
        
        if(this.state.pickerOptions.length > 0){
            this.props.data.options.forEach((option, id) => {
                const selected = false;
                // this.state.selectedOptions.forEach((selected) => {
                //     if(selected === option){
                //         selected = true
                //     };
                // });
                console.log(this.state.pickerOptions);
                options.push(
                    <PickerOption
                        optionData = {option}
                        key = {id}
                        id = {id}
                        handleClick = {this.handleClick}
                        selected = {this.state.pickerOptions[id].selected}
                    />
                )
            });
        }
        return (
            <span className="picker">
                {options}
                <input
                    className = "form-button"
                    type = "submit"
                    value = {buttonLabel} 
                    onClick = {() => this.submitAnswer()}
                />    
            </span>
        );
    }
}

export default MultiPicker;