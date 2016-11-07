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
        });
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

  renderAddLesson() {
    const { saveButtonStyle, answerInputStyle } = styles;
    if (this.state.showInput) {
      return (
        <form onSubmit={this.addLessonToDB.bind(this)}>
            <input style={answerInputStyle} placeholder="Add lesson..." onChange={this.handleChange.bind(this)}></input>
            <Button onClick={this.addLessonToDB.bind(this)} style={saveButtonStyle}>Add</Button>
        </form>
      )
    }
  }

  render () {
    const { LessonTitleListStyle, saveButtonStyle, fontAwesomeStyle, addLesson } = styles;
    return (
      <div style={LessonTitleListStyle}>
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
                removeLesson={this.removeLesson.bind(this)}
              />
            )
          })
        }
        {this.renderAddLesson()}
        <span style={{cursor: 'pointer'}}><i onClick={this.props.addLesson} className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle} ></i></span>
      </div>
    )
  }
}

const styles = {
  LessonTitleListStyle: {
    height: '100%',
    width: '20%',
    fontSize: 20,
    backgroundColor: 'white',
    position: 'relative',
    paddingTop: 100,
    paddingRight: 0,
    paddingLeft:0,
    fontFamily: 'Lato',
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.2)',
    overflowY: 'auto',
    display: 'inline-block'
  },
  fontAwesomeStyle: {
    color: '#DADCDD',
    display: 'inline',
    marginLeft: 10,
    marginTop: 50,
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