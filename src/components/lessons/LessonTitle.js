import React, { Component } from 'react';
import QuestionTitleList from '../questions/QuestionTitleList';


class LessonTitle extends Component {
  constructor(props) {
    super(props);
  }

  renderTitles() {

    /*sets the style to be either selected+default or default style alone, depending on the selectedLesson prop in app.js's state.*/

    const { defaultStyle, selectedStyle } = styles;

    let titleStyle = this.props.isSelectedLesson ? {...defaultStyle, ...selectedStyle} : defaultStyle

    return (
      <div style={titleStyle} onClick={this.props.handleLessonClick.bind(this, this.props)}>
        <p>{this.props.title}</p>
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
  }

}

export default LessonTitle