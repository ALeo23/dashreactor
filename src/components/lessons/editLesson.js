import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class editLesson extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: this.props.lesson || {type: "JavaScript"}
    }
  }

  handleChange(changed, event) {
    var newInputs = this.props.lesson || this.state.inputs;
    newInputs[changed] = event.target.value;
    this.setState({
      inputs: newInputs
    });
    console.log(this.state.inputs)
  }

  addLessonToDB(event) {
    event.preventDefault();
    fetch('http://localhost:3011/api/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.inputs)
    })
    .then(response => response.json())
    .then(function(response) {
      console.log(response)
    })
  };

  removeLesson(id) {
    var that = this
    let url = 'http://localhost:3011/api/lessons/' + id
    fetch(url, {
      method: 'DELETE',
    }).then(respone =>
    respone.json().then(json => {
      return json
    }))
    this.setState({
      lessons: this.state.lessons.filter(lesson => { console.log(lesson); return lesson._id !== id})
    })
    this.props.hideContent().bind(this)
  }

  renderType() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h2>Language</h2>
        <select onChange={this.handleChange.bind(this, 'type')} value={this.state.inputs.type}>
          <option>Javascript</option>
          <option>Ruby</option>
          <option>Python</option>
          <option>C#</option>
          <option>PHP</option>
          <option>Java</option>
        </select>
      </div>
    )
  }

  renderTitle() {
    const { answerInputStyle } = styles;
    return (
      <div>
        <h2>Title</h2>
        <input style = { answerInputStyle } onChange={this.handleChange.bind(this, 'title')} placeholder="..." value={this.state.inputs.title}></input>
      </div>
    )
  }


  renderDescription() {
    const { editableTextStyle } = styles;
      return (
        <div>
          <h2>Description</h2>
          <textArea style = { editableTextStyle } placeholder="Write your lesson description here..." onChange={this.handleChange.bind(this, 'description')} value={this.state.inputs.description}/>
        </div>
      )
  }

  render() {
    const { QuestionDetailStyle, saveButtonStyle, deleteButtonStyle } = styles;
    return (
      <div style={QuestionDetailStyle}>
        <i style={{color: lightGrey}}>Click elements to edit</i>
        {this.renderTitle()}
        {this.renderDescription()}
        {this.renderType()}
        <div style={{ float: "right", marginTop: "30px"}}>
          <Button style={saveButtonStyle} onClick={this.addLessonToDB.bind(this)}>Save</Button>
          <Button style={deleteButtonStyle}>Delete</Button>
        </div>
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
    height: 40,
    textWrap: true,
    paddingRight: 0,
    paddingLeft:40,
    fontFamily: 'Lato',
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
    display: 'inline',
    color: '#7A7886'
  },

  editableTextStyle: {
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '100px',
    resize: 'none'
  },
  saveButtonStyle: {
    color: 'white',
    backgroundColor: coral,
    marginRight: '10px'
  },
    deleteButtonStyle: {
    color: 'white',
    backgroundColor: coral,
  }
}

export default editLesson;