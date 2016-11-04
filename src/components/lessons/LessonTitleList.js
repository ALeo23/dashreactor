import React, { Component } from 'react';
import LessonTitle from '../lessons/LessonTitle';
import { Button, Col } from 'react-bootstrap';


class LessonTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      newLesson: '',
      showInput: false
    }
    this.getLessonTitles();
  }

//not actually using live data yet
  getLessonTitles() {
    let url = 'http://localhost:3011/api/lessons';

    fetch(url, { method: 'get' })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log('DATA =>', data)
      this.setState( { 'lessons': data } );
    })
  }

  handleChange(event) {
    this.setState({
      newLesson: event.target.value,
    })
  }

  addLessonToDB(event) {
    event.preventDefault();
    var newlesson = this.state.newLesson
    var lessons = this.state.lessons
    var that = this
    fetch('http://localhost:3011/api/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"title": newlesson})
    })
    .then(response => response.json())
    .then(function(response) {
      that.state.lessons.push(response)
      that.setState({
        lessons: that.state.lessons,
        showInput: !that.state.showInput});
    })
  };


  renderAddLesson() {
    const { saveButtonStyle, answerInputStyle } = styles;
    if (this.state.showInput) {
      return (
        <form onSubmit={this.addLessonToDB.bind(this)}>
            <input style={answerInputStyle} placeholder="Add lesson..." onChange={this.handleChange.bind(this)}></input>
            <Button style={saveButtonStyle}>Add</Button>
        </form>
      )
    }
  }

  handleInputChange() {
    this.setState({
      showInput: !this.state.showInput
    })
  }

  render () {
    const { LessonTitleListStyle, saveButtonStyle, fontAwesomeStyle, addLesson } = styles;
    return (
      <Col sm={3} style={LessonTitleListStyle}>
        {
          this.state.lessons.map(lesson => {
            let isSelectedLesson = lesson._id === this.props.selectedLessonId;
            //console.log('lesson', lesson._id, 'prop', this.props.selectedLessonId);
            return (
              <LessonTitle
                isSelectedLesson={isSelectedLesson}
                handleLessonClick={this.props.handleLessonClick.bind(this)}
                title={lesson.title}
                lessonId={lesson._id}
              />
            )
          })
        }
        {this.renderAddLesson()}
        <span style={{cursor: 'pointer'}}><i onClick={this.handleInputChange.bind(this)} className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle} ></i></span>
      </Col>
    )
  }
}

const styles = {
  LessonTitleListStyle: {
    height: '100%',
    fontSize: 20,
    backgroundColor: 'white',
    position: 'fixed',
    paddingTop: 100,
    paddingRight: 0,
    paddingLeft:0,
    marginLeft: 100,
    fontFamily: 'Lato',
    zIndex: 0,
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.2)',
    overflowY: 'auto'
  },
  fontAwesomeStyle: {
    color: '#DADCDD',
    display: 'inline',
    marginLeft: 10,
    marginTop: 50,
    // textAlign: 'left',
    fontSize: 40,
  },
  saveButtonStyle: {
    color: 'white',
    backgroundColor: 'rgb(250, 132, 138)',
    marginBottom: '5px'
  },
  answerInputStyle: {
    border: 'none',
    display: 'inline',
    color: '#7A7886'
  },

}

export default LessonTitleList