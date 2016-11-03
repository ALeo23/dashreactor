import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

class QuestionDetail extends Component {
  constructor(props) {
    super(props)

    //saves array of the answers inherited through props, in order to be able to add more choices/inputs to it
    this.state = {
      inputs: this.props.question.choices
    }
  }

  renderQuestion() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h2>Question</h2>
        <textArea style = { editableTextStyle } defaultValue={this.props.question.text} />
      </div>
    )
  }


  renderAnswers() {
    const { answerInputStyle, fontAwesomeStyle } = styles;
    if (this.props.question.choices) {
      return (
        <div>
          <h2>Answers</h2>
            {this.state.inputs.map(choiceInput => {
              return (
                <div>
                  <input style={answerInputStyle} placeholder="..." defaultValue={choiceInput}/>
                </div>
              )
            })}
          <i className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle}></i>
          <p onClick={this.addChoice.bind(this)} style={{display: "inline"}}> Add another choice</p>
        </div>
      )
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

  render() {
    const { QuestionDetailStyle, saveButtonStyle } = styles;
    return (
      <Col sm={5} smOffset={7} style={QuestionDetailStyle}>
        <i style={{color: lightGrey}}>Click elements to edit</i>
        {this.renderQuestion()}
        {this.renderAnswers()}
        <Button style={saveButtonStyle}>Save</Button>
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
    display: 'inline',
    color: '#7A7886'
  },

  editableTextStyle: {
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
    display: 'inline-block'
  },

  saveButtonStyle: {
    color: 'white',
    backgroundColor: coral,
    marginTop: 50,
    marginLeft: 200
  }
}

export default QuestionDetail;

