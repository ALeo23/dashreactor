import React, { Component } from 'react';
import QuestionTitleList from '../questions/QuestionTitleList';


class LessonTitle extends Component {
  constructor(props) {
    super(props);
  }

  renderTitles() {

    /*sets the style to be either selected+default or default style alone, depending on the selectedLesson prop in app.js's state.*/

    const { defaultStyle, selectedStyle, squeezeTitles } = styles;

    let titleStyle = this.props.isSelectedLesson ? {...defaultStyle, ...selectedStyle} : defaultStyle

    return (
      <div style={titleStyle}>
        <div onClick={this.props.handleLessonClick.bind(this, this.props)}>
          { this.props.title }
        </div>
        <span onClick={this.props.removeLesson.bind(this, this.props.lessonId)}>Delete...</span>
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.renderTitles()}
      </div>
    )
  }
}

const coral = '#FA848A'

const styles = {
  defaultStyle: {
    backgroundColor: 'white',
    position: 'relative',
    display: 'block',
    height: 60,
    width: '100%',
    paddingLeft: 10,
    fontFamily: 'Lato',
    paddingBottom: 15,
    cursor: 'pointer',
  },
  selectedStyle: {
    backgroundColor: coral,
    color: 'white',
  },

}

export default LessonTitle