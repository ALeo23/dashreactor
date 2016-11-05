import React, { Component } from 'react';
import QuestionTitleList from '../questions/QuestionTitleList';


class LessonTitle extends Component {
  constructor(props) {
    super(props);
  }

  renderTitles() {

    /*sets the style to be either selected+default or default style alone, depending on the selectedLesson prop in app.js's state.*/

    const { defaultStyle, selectedStyle, titleStyle, deleteStyle, hideStyle} = styles;

    let divStyle = this.props.isSelectedLesson ? {...defaultStyle, ...selectedStyle} : defaultStyle
    let show = this.props.isSelectedLesson ? deleteStyle : hideStyle
    return (
      <div style={divStyle}>
        <div style={titleStyle} onClick={this.props.handleLessonClick.bind(this, this.props)}>
          { this.props.title }
        </div>
        <span style={show} onClick={this.props.removeLesson.bind(this, this.props.lessonId)}>x</span>
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
    height: 40,
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
  titleStyle: {
    position: "relative",
    display: "inline-block",
    width: "80%",
    height: "100%"
  },
  deleteStyle: {
    position: "relative",
    float: "right",
    marginRight: "10%"
  },
  hideStyle: {
    visibility: "hidden"
  }

}

export default LessonTitle