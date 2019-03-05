import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MultiField from './components/MultiField.js'
import AddressInput from './components/AddressInput.js'
import Picker from './components/Picker.js'
import MultiPicker from './components/MultiPicker.js'
import Backarrow from './components/Backarrow';


class Question extends React.Component {
    render() {
        let headline = "";
        let subhead = "";
        let question = "";
        let type = "";
        // const currentAnswer = this.props.currentAnswer;
        // const buttonLabel = this.props.currentQuestionId === 0 ? "Go" : "continue";
        
        if(this.props.data){
            headline = this.props.data.headline;
            subhead = this.props.data.subhead;
            type = this.props.data.type;
            if(type === "multifield"){
                question = <MultiField 
                    data = {this.props.data} 
                    handleAnswer = {this.props.handleAnswer} 
                    fieldStates = {this.props.answers[this.props.data.id]}
                />
            }else if(type === "picker"){
                question = <Picker data={this.props.data} handleAnswer={this.props.handleAnswer} currentAnswer={this.props.currentAnswer} />
            }else if(type === "multipicker"){
                question = <MultiPicker data={this.props.data} handleAnswer={this.props.handleAnswer} currentAnswer={this.props.currentAnswer} />
            }else if(type === "address"){
                question = <AddressInput 
                    data = {this.props.data} 
                    handleAnswer = {this.props.handleAnswer} 
                    fieldStates = {this.props.answers[this.props.data.id]}
                />
            }
        }
        return (
            <span className="question-container">
                <h2>{headline}</h2>
                <h3>{subhead}</h3>
                <span>
                    {question}
                </span>
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
            answers: {},
        }
    }

    componentDidMount = () => {
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
    }

    handleAnswer = (questionId, answerData) => {
        this.nextQuestion();
        this.setAnswer(questionId, answerData);
    }

    setAnswer = (questionId, answerData) => {
        var updatedAnswers = Object.assign({}, this.state.answers, {[questionId]: answerData});
        this.setState({answers : updatedAnswers});
    }

    nextQuestion = () => {
        this.setState({currentQuestion : this.state.currentQuestion + 1});
    }

    previousQuestion = () => {
        this.setState({currentQuestion : this.state.currentQuestion - 1});
    }

    render() {
        return (
            <span className="question-outer">
                <Backarrow
                    currentQuestion = {this.state.currentQuestion}
                    onClick = {() => this.previousQuestion()}
                />
                <Question 
                    answers = {this.state.answers}
                    data = {this.state.questions[this.state.currentQuestion]}
                    currentQuestionId = {this.state.currentQuestion}
                    handleAnswer = {this.handleAnswer}
                    currentAnswer = {this.state.answers[this.state.currentQuestion]}
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
