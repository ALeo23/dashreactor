import React, { Component } from 'react';


class QuestionTitle extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    const { defaultStyle, selectedStyle } = styles;
    let titleStyle = this.props.isSelectedQuestion ? {...defaultStyle, ...selectedStyle} : defaultStyle

    return (
      <div style={titleStyle} onClick={this.props.handleQuestionClick.bind(this, this.props.questionContent)}>
        <p>{this.props.title}</p>
      </div>
    )
  }
}

const coral = '#FA848A'

const styles = {
  defaultStyle: {
    width: '100%',
    backgroundColor: 'white',
    height: 60,
    paddingLeft: 10,
    fontFamily: 'Lato',
    cursor: 'pointer',
  },

  selectedStyle: {
    color: 'white',
    backgroundColor: coral,
    opacity: 1,
  }
}

export default QuestionTitle