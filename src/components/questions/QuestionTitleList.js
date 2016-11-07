import React, { Component } from 'react';
// import LessonDummyData from './LessonDummyData';
import QuestionTitle from '../questions/QuestionTitle';
import { Col } from 'react-bootstrap';

class QuestionTitleList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   lessons: LessonDummyData
    // }
  }


  render () {

    const { questionListStyle, fontAwesomeStyle } = styles;

    return (
      <div style={questionListStyle} >
        {
          this.props.lessonContent.map(question => {
            let isSelectedQuestion;
            if (question.text.length >= 60) {
              question.abbrev = question.text.substring(0, 57) + '...';
            } else {
              question.abbrev = question.text;
            }

            if (this.props.selectedQuestion) {
              isSelectedQuestion = this.props.selectedQuestion.text === question.text
            }



            return (
              <QuestionTitle
                title={question.abbrev}
                questionContent={question}
                isSelectedQuestion={isSelectedQuestion}
                handleQuestionClick={this.props.handleQuestionClick.bind(this)}
              />
            )
          })
        }
        <span style={{cursor: 'pointer'}}><i onClick={this.props.handleAddQuestionClick.bind(this, this.props.lessonId)} className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle} ></i></span>
      </div>
    )
  }
}

const coral = '#FA848A'
const lightGrey = '#A3A8AB'


const styles = {
  questionListStyle: {
    height: '100%',
    width: '25%',
    position: 'relative',
    paddingRight: 0,
    paddingLeft: 0,
    paddingLeft: 0,
    paddingTop: 100,
    marginTop: 0,
    fontFamily: 'Lato',
    fontSize: 18,
    boxShadow: '2px 0px 5px -1px rgba(0,0,0,0.2)',
    overflowY: 'auto',
    display: 'inline-block',
    verticalAlign: "top"
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

export default QuestionTitleList