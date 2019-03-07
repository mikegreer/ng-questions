import React from 'react';
import './multifield.css';

class MultiField extends React.Component {
    constructor() {
        super();
        this.state = {
            fieldStates : {},
        };
    }

    componentDidMount() {
        console.log(this.props.currentAnswer);
        let fieldStates = {};
        this.props.data.fields.forEach((field, id) => {
            fieldStates[field.datalabel] = '';
        });
        fieldStates = Object.assign(fieldStates, this.props.currentAnswer);
        this.setState({ fieldStates: fieldStates });
    }

    submitAnswer = () => {
        this.props.handleAnswer(this.state.fieldStates);
    }

    handleChange = (event) => {
        const fieldStates = Object.assign({}, this.state.fieldStates, {[event.target.name]:event.target.value});
        this.setState({ fieldStates: fieldStates });
    };

    render() {
        let fields = [];
        this.props.data.fields.forEach((field, id) => {
            let largeLabel = false;
            if(this.state.fieldStates[field.datalabel] === ''){
                largeLabel = true;
            }
            fields.push(
                <span className="label-text-input">
                    <label className={largeLabel ? 'fill-input' : null}>{field.label}</label>
                    <input 
                        className = "text-input"
                        name = {field.datalabel}
                        type = "text"
                        onChange = {this.handleChange}
                        label = {field.label}
                        value = {this.state.fieldStates[field.datalabel] || ''}
                    />
                </span>
            );
        });
        const buttonLabel = this.props.data.buttonLabel ? this.props.data.buttonLabel : 'continue'
        return(
            <div className="multifield">
                {fields}
                <span className="button-wrapper">
                    <input
                        className = "form-button"
                        type = "submit"
                        value = {buttonLabel} 
                        onClick = {() => this.submitAnswer()}
                    />
                </span>
            </div>
        );
    }
}

export default MultiField;