import React, { Component } from 'react';
import LessonTitle from '../lessons/LessonTitle';
import { Col } from 'react-bootstrap';


class LessonTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
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
      //console.log('DATA =>', data)
      this.setState( { 'lessons': data } );
    })
  }

  render () {
    const { LessonTitleListStyle } = styles;

    return (
      <Col sm={3} style={LessonTitleListStyle}>
        {
          this.state.lessons.map(lesson => {
            let isSelectedLesson = lesson.title === this.props.selectedLessonTitle

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
  },
}

export default LessonTitleList