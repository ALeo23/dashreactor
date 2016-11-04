import React, { Component } from 'react';
import LessonTitle from '../lessons/LessonTitle';
import { Button, Col } from 'react-bootstrap';


class LessonTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      newLesson: ''
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
      that.setState({lessons: that.state.lessons});
    })
  };

  render () {
    const { LessonTitleListStyle, fontAwesomeStyle } = styles;
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
        <form onSubmit={this.addLessonToDB.bind(this)}>
          <input placeholder="Add lesson..." onChange={this.handleChange.bind(this)}></input>
          <button><i className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle}></i></button>
        </form>
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

}

export default LessonTitleList