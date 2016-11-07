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

  handleEdit(id) {

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
                editLesson={this.handleEdit.bind(this)}
              />
            )
          })
        }
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