import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

class newQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      choices: [],
      text: '',
      type: 'reading',
      answer: ''
    }
  }

  //adds another text input for answer choices, up to 5 total
  addChoice() {
    let choices = this.state.choices;
    choices.push("");
    this.setState({choices: choices});
  }

  handleChange(changed, index, event) {
    var newInputs = this.state;
    if(index !== undefined){
      newInputs[changed][index] = event.target.value;
    } else {
      newInputs[changed] = event.target.value;
    }
    this.setState({
      [changed]: newInputs[changed]
    });
    //console.log(this.state.text)
  }

  handleAnswer(event) {
    this.setState({
      answer: event.target.name
    });
  }

  renderQuestion() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h2>Question</h2>
        <textArea style = { editableTextStyle } placeholder="Write your question here..." onChange={this.handleChange.bind(this, 'text', undefined)} />
      </div>
    )
  }

  renderType() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h2>Type</h2>
        <select onChange={this.handleChange.bind(this, 'type', undefined)}>
          <option selected>reading</option>
          <option>question</option>
        </select>
      </div>
    )
  }


  renderAnswers() {
    const { answerInputStyle, fontAwesomeStyle, addNewChoiceSpanStyle } = styles;
    if (this.state.type === 'question') {
      return (
        <div>
          <h2>Answers</h2>
          {this.state.choices.map((choiceInput, index) => {
            var checked = index == this.state.answer ? 'checked' : ''
              return (
                <div>
                  <input checked={checked} name={index} onChange={this.handleAnswer.bind(this)} type="checkbox"></input><input style={answerInputStyle} placeholder="..." value={choiceInput} onChange={this.handleChange.bind(this, 'choices', index)}/>
                </div>
              )
          })}
          <span style={addNewChoiceSpanStyle}>

            <i className="fa fa-plus-circle"
              aria-hidden="true"
              style={fontAwesomeStyle}>
            </i>
            <p style={{display: "inline"}} onClick={this.addChoice.bind(this)}>
              Add another choice
            </p>
          </span>

        </div>
      )
    }
  }



  render() {
    const { QuestionDetailStyle, editableTextStyle, saveButtonStyle } = styles;
    return (
      <div style={QuestionDetailStyle}>
        <i style={{color: lightGrey}}>Click elements to edit</i>
        {this.renderQuestion()}
        {this.renderType()}
        {this.renderAnswers()}
        <Button style={saveButtonStyle} onClick={this.props.handleSaveNewQuestionClick.bind(this, this.state.text, this.state.choices, this.state.type, this.state.answer)}>Save</Button>
      </div>
    )
  }
}

const coral = '#FA848A'
const lightGrey = '#A3A8AB'

const styles = {
  QuestionDetailStyle: {
    height: '100%',
    fontSize: 20,
    position: 'relative',
    paddingTop: 90,
    width: '40%',
    textWrap: true,
    paddingRight: 0,
    paddingLeft:40,
    fontFamily: 'Lato',
    overflowY: 'auto',
    display: 'inline-block',
    verticalAlign: 'top'
  },

  fontAwesomeStyle: {
    color: lightGrey,
    display: 'inline',
    paddingRight: 3,
  },

  answerInputStyle: {
    border: 'none',
    color: '#7A7886',
  },

  editableTextStyle: {
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
    width: '100%',
    height: '100px',
    resize: 'none'
  },
  addNewChoiceSpanStyle: {
    display:'block',
    color: lightGrey
  },

  saveButtonStyle: {
    color: 'white',
    backgroundColor: coral,
    marginTop: 50,
    marginLeft: 200
  }
}

export default newQuestion;