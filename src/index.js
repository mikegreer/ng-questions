import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import TextField from '@material-ui/core/TextField';

class MultiField extends React.Component {
    render() {
        let fields = [];
        this.props.data.fields.forEach((field, id) => {
            fields.push(
                <TextField
                    type="text"
                    key={id}
                    label={field.label}
                ></TextField>
            );
        });
        return(
            <span>
                {fields}
            </span>
        );
    }
}

class PickerOption extends React.Component {
    render() {
        return (
            <span onClick={() => this.props.nextQuestion()}>
                <img src={this.props.optionData.image} alt=""></img>
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
                    nextQuestion = {() => {this.props.nextQuestion()}}
                />
            )
        })
        return (
            <span>{options}</span>
        );
    }
}

class Question extends React.Component {
    render() {
        let headline = "";
        let subhead = "";
        let question = "";
        let type = "";
        const buttonLabel = this.props.currentQuestionId === 0 ? "Get started" : "continue";
        
        if(this.props.data){
            headline = this.props.data.headline;
            subhead = this.props.data.subhead;
            type = this.props.data.type;
            if(type === "multifield"){
                question = <MultiField data={this.props.data}/>
            }else if(type === "picker"){
                question = <Picker data={this.props.data} nextQuestion={this.props.nextQuestion} />
            }
        }
        return (
            <span className="question-container">
                <h2>{headline}</h2>
                <h3>{subhead}</h3>
                <span>
                    {question}
                </span>
                <button 
                    className = {type === "picker" ? "hidden" : "visible"}
                    onClick = {() => {this.props.nextQuestion()}}
                >
                    {buttonLabel}
                </button>
            </span>
        );
    }
}

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            questions: [],
        }
    }

    componentDidMount = () => {
        // fetchFile = (filePath) => {
            fetch("../questions.json", {
                method: "GET",
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            })
            .then((resp) => {
                return resp.json()
            }).then((data) => {
                this.setState({questions: data.questions});
            }); 
        // }
    }

    nextQuestion = () => {
        this.setState({currentQuestion : this.state.currentQuestion + 1})
    }

    render() {
        return (
            <span>
                <Question 
                    data = {this.state.questions[this.state.currentQuestion]}
                    currentQuestionId = {this.state.currentQuestion}
                    nextQuestion = {this.nextQuestion}
                />
            </span>
        );
    }
}


ReactDOM.render(
    <Questions />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
