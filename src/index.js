import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MultiField from './components/MultiField.js'
import AddressInput from './components/AddressInput.js'
import Picker from './components/Picker.js'
import MultiPicker from './components/MultiPicker.js'
import Backarrow from './components/Backarrow';

class Answers extends React.Component {
    render () {
        const answers = [];
        this.props.questionIndex.forEach((key) => {
            answers.push(this.props.answerData[key]);
        });
        const stringAnswers = [];
        answers.forEach((answer) => {
            stringAnswers.push(<div>{JSON.stringify(answer)}</div>);
        });

        var divStyle = {
             width: '70vw',
        };
        return (
            <div style={divStyle}>
                <h2>Answers</h2>
                {stringAnswers}
            </div>
        );
    }
}

class Question extends React.Component {
    handleAnswer = (answerData) => {
        this.props.handleAnswer(this.props.questionKey, answerData);
    }

    render() {
        let headline = "";
        let subhead = "";
        let question = "";
        let type = "";

        if(this.props.data){
            headline = this.props.data.headline;
            subhead = this.props.data.subhead;
            type = this.props.data.type;
            if(type === "multifield"){
                question = <MultiField 
                    data = {this.props.data}
                    handleAnswer={(answerData) => this.handleAnswer(answerData)} 
                    currentAnswer = {this.props.answer}
                />
            }else if(type === "picker"){
                question = <Picker
                    data={this.props.data} 
                    handleAnswer={(answerData) => this.handleAnswer(answerData)} 
                    currentAnswer={this.props.answer} 
                />
            }else if(type === "multipicker"){
                question = <MultiPicker 
                    data={this.props.data} 
                    handleAnswer={(answerData) => this.handleAnswer(answerData)} 
                    currentAnswer={this.props.answer}
                />
            }else if(type === "address"){
                question = <AddressInput 
                    data = {this.props.data} 
                    handleAnswer = {(answerData) => this.handleAnswer(answerData)} 
                    fieldStates = {this.props.answer}
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
            questionIndex: [],
            questions: {},
            answers: {},
            questionCount: 0,
            firstName: "",
            showResults: false,
        }
    }

    componentDidMount = () => {
        fetch("../questionData/questions.json", {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then((resp) => {
            return resp.json()
        }).then((data) => {
            this.setState({
                questionIndex: this.orderQuestionsByDisplayOrder(data),
                questions: data
            });
        }); 
    }

    orderQuestionsByDisplayOrder = (questions) => {
        const questionsDisplayOrder = [];
        Object.keys(questions).forEach(key => {
            questionsDisplayOrder.push([key, questions[key].displayOrder]);
        });
        questionsDisplayOrder.sort(function(a, b) {
            return a[1] - b[1];
        });
        const questionArray = [];
        questionsDisplayOrder.forEach((question) => {
            questionArray.push(question[0])
        });
        return questionArray;
    }
    
    getKeyByDisplayIndex = (index) => {
        return this.state.questionIndex[index];
    }

    handleAnswer = (key, answerData) => {
        this.nextQuestion();
        this.setAnswer(key, answerData);
    }

    setAnswer = (key, answer) => {
        var updatedAnswers = Object.assign({}, this.state.answers, {[key]: answer});
        this.setState({answers : updatedAnswers});
        if(key === 'name'){
            this.setState({firstName: answer.firstname});
        }
    }
    
    nextQuestion = () => {
        if(this.state.questionCount >= this.state.questionIndex.length - 1){
            console.log("Questions done");
            this.setState({
                showResults: true
            });
        }else{
            this.setState({showResults: false});
        }
        //check for supplementary questions
        //if current question has supplementary qs
            //if answers given trigger supplementary qs
                //load supplementary question
                //NEEDED: a state property to reflect a supplementary q is in progress
                //2.1?
        this.setState({questionCount : this.state.questionCount + 1});
    }

    previousQuestion = () => {
        this.setState({showResults: false});
        this.setState({questionCount : this.state.questionCount - 1});
    }

    render() {
        const key = this.getKeyByDisplayIndex(this.state.questionCount);
        return (
            <span className="question-outer">
                <Backarrow
                    hidden = {this.state.questionCount < 1}
                    onClick = {() => this.previousQuestion()}
                />
                <Question 
                    answer = {this.state.answers[key]}
                    questionKey = {key}
                    data = {this.state.questions[key]}
                    questionCount = {this.state.questionCount}
                    handleAnswer = {this.handleAnswer}
                    firstName = {this.state.firstName}
                />
                { this.state.showResults ? <Answers questionIndex={this.state.questionIndex} answerData={this.state.answers} /> : null }
            </span>
        );
    }
}

ReactDOM.render(
    <Questions />, 
    document.getElementById('root')
);

serviceWorker.unregister();