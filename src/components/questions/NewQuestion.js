import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

class newQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputs: []
    }
  }

  //adds another text input for answer choices, up to 5 total
  addChoice() {
    if (this.state.inputs.length < 5) {
      let choices = this.state.inputs;
      choices.push("");
      this.setState({inputs: choices});
    }
  }

  renderQuestion() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h2>Question</h2>
        <textArea style = { editableTextStyle } placeholder="Write your question here..." />
      </div>
    )
  }


  renderAnswers() {
    const { answerInputStyle, fontAwesomeStyle, addNewChoiceSpanStyle } = styles;

      return (
        <div>
          <h2>Answers</h2>
          <input style={answerInputStyle} placeholder="Enter choice" />
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



  render() {
    const { QuestionDetailStyle, editableTextStyle, saveButtonStyle } = styles;
    return (
      <Col sm={5} smOffset={7} style={QuestionDetailStyle}>
        <i style={{color: lightGrey}}>Click elements to edit</i>
        {this.renderQuestion()}
        {this.renderAnswers()}
        <Button style={saveButtonStyle} onClick={this.props.handleSaveNewQuestionClick.bind(this)}>Save</Button>
      </Col>
    )
  }
}

const coral = '#FA848A'
const lightGrey = '#A3A8AB'

const styles = {
  QuestionDetailStyle: {
    height: '100%',
    fontSize: 20,
    position: 'fixed',
    paddingTop: 90,
    width: '100%',
    height: 40,
    textWrap: true,
    paddingRight: 0,
    paddingLeft:40,
    fontFamily: 'Lato',
    zIndex: -1,
  },

  fontAwesomeStyle: {
    color: lightGrey,
    display: 'inline',
    paddingRight: 3,
  },

  answerInputStyle: {
    border: 'none',
    color: '#7A7886'
  },

  editableTextStyle: {
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
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