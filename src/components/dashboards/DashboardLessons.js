import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import LessonTitleList from '../lessons/LessonTitleList';
import QuestionTitleList from '../questions/QuestionTitleList';
import QuestionDetail from '../questions/QuestionDetail';
import NewQuestion from '../questions/NewQuestion';
import { Button, Col, Row } from 'react-bootstrap';


class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedLesson: null,
      selectedLessonQuestions: null,
      selectedLessonId: null,
      selectedQuestion: null,

      //determines whether 'NewQuestion' is visible.
      creatingQuestion: false,
    }
  }


  handleLessonClick (lesson) {
    let url = 'http://localhost:3011/api/lessons/' + lesson.lessonId;
    fetch(url, { method: 'get' })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(lesson);
        this.setState({
          selectedLesson: lesson,
          selectedLessonQuestions: data.lessonContent,
          selectedLessonId: lesson.lessonId
        });
      });
  }


  handleQuestionClick (question) {
      this.setState({
        selectedQuestion: question
      });
  }

//enables appearance of question-creation form (NewQuestion.js)
  handleAddQuestionClick (lesson) {
    this.setState({creatingQuestion: true});
  }

//at the moment this just clears the NewQuestion form without saving.
  handleSaveNewQuestionClick () {
    this.setState({creatingQuestion: false});
  }

  renderNewQuestion() {
    if (this.state.creatingQuestion) {
      return <NewQuestion handleSaveNewQuestionClick={this.handleSaveNewQuestionClick.bind(this)}/>
    }
  }


  renderQuestionList () {
    if (this.state.selectedLesson) {
      return (
        <QuestionTitleList
          title={this.state.selectedLessonTitle}
          lessonContent={this.state.selectedLessonQuestions}
          selectedQuestion={this.state.selectedQuestion}
          handleQuestionClick={this.handleQuestionClick.bind(this)}
          handleAddQuestionClick={this.handleAddQuestionClick.bind(this)}
        />
      )
    }
  }

//this is the component that displays the text and choices of currently selected question - can add choices but currently does not save. Also will need to be tweaked to display which choice is the correct answer.
  renderQuestionDetail () {
    if (this.state.selectedQuestion) {
      return (
        <QuestionDetail
          // title={this.state.selectedLessonTitle}
          question={this.state.selectedQuestion}
        />
      )
    }
  }


  render() {
    return (
      <Row className="App">
        <Navbar />
        <div className="container-fluid">
        <LessonTitleList selectedLessonId={this.state.selectedLessonId} handleLessonClick={this.handleLessonClick.bind(this)}/>
        {this.renderQuestionList()}
        {this.renderQuestionDetail()}
        {this.renderNewQuestion()}
        </div>
      </Row>
    );
  }
}

export default App;
