import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import LessonTitleList from '../lessons/LessonTitleList';
import QuestionTitleList from '../questions/QuestionTitleList';
import QuestionDetail from '../questions/QuestionDetail';
import NewQuestion from '../questions/NewQuestion';
import { Button, Col, Row } from 'react-bootstrap';
import AuthService from '../utils/AuthService';
import EditLesson from '../lessons/editLesson';
import AddLesson from '../lessons/newLesson'


const auth = new AuthService('4ZP5XvMbVnvvU6hSpNT3togDmRzI7pHH', 'scripty-luke.auth0.com');


class App extends Component {
  constructor() {
    super();

    this.state = {
      lessons: null,
      selectedLesson: null,
      selectedLessonQuestions: null,
      selectedLessonId: null,
      selectedQuestion: null,
      editLesson: false,
      creatingLesson: false,
      //determines whether 'NewQuestion' is visible.
      creatingQuestion: false
    }
    console.log("hello", this.state.lessons)
  }

  deletedLesson() {
    this.setState({
      selectedLesson: null,
      selectedLessonQuestions: null,
      selectedLessonId: null,
      selectedQuestion: null
    })
  }

  deletedQuestion(id) {
    var newQ = this.state.selectedLessonQuestions.filter(question => question._id !== id)
    this.setState({
      selectedQuestion: null,
      selectedLessonQuestions: newQ
    })
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
          selectedLessonId: lesson.lessonId,
          selectedQuestion: null,
          creatingQuestion: false,
          creatingLesson: false,
          editLesson: false
        });
      });
  }


  handleQuestionClick (question) {
    this.setState({
      selectedQuestion: question,
      creatingQuestion: null
    });
  }

//enables appearance of question-creation form (NewQuestion.js)
  handleAddQuestionClick () {
    this.setState({
      creatingQuestion: true,
      selectedQuestion: null
    });
  }

  handleEditLessonClick() {
    this.setState({
      creatingQuestion: false,
      selectedQuestion: null,
      editLesson: this.state.selectedLesson.lesson,
      selectedLesson: null,
      creatingLesson: false
    })
  }

  handleAddLessonClick() {
    this.setState({
      creatingQuestion: false,
      selectedQuestion: null,
      creatingLesson: true,
      selectedLesson: null,
      editLesson: false,
      selectedLessonId: null
    })
  }


//at the moment this just clears the NewQuestion form without saving.
  handleSaveNewQuestionClick (text, choices, type, answer) {
    var length = this.state.selectedLessonQuestions.length + 1;
    var id = this.state.selectedLessonId;
    console.log('text', text)
    console.log('choices', choices)
    console.log('type', type)
    console.log(length)
    fetch('http://localhost:3011/api/content/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "text": text,
        "choices": choices,
        "type": type,
        "order": length,
        "answer": answer
      })
    })
    .then(response => response.json())
    .then(response => {
      this.state.selectedLessonQuestions.push(response)
      this.setState({
        creatingQuestion: null
      });
    })
  }

  editLessonInDB(id, title, description, type) {
    console.log(description, type)
    fetch('http://localhost:3011/api/lessons/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        type: type
      })
    })
    .then(response => response)
    .then(response => {
      var selected = this.state.editLesson
      console.log(selected)
      selected.title = title;
      selected.description = description;
      selected.type = type;
      this.setState()
    })
  }

  loadingLessons(lessons) {
    this.setState({
      lessons: lessons
    })
  }

  handleDeleteLesson (id) {
    this.state.lessons.forEach((question, index) => {
      if(question._id === id){
        this.state.lessons.splice(index, 1)
      }
    })
    this.setState({
      selectedLesson: null,
      editLesson: false
    })
  }

  addLessonToDB(lesson) {
    console.log(lesson)
    fetch('http://localhost:3011/api/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(lesson)
    })
    .then(response => response.json())
    .then(response => {
      this.state.lessons.push(response)
      this.setState()
    })
  };

  handleSubmit(id, text, choices, type, answer) {
    fetch('http://localhost:3011/api/content/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "text": text,
        "choices": choices,
        "type": type,
        "answer": answer
      })
    })
    .then(response => response.json())
    .then(response => {
      var selected = this.state.selectedQuestion;
      selected.text = text;
      selected.choices = choices;
      selected.type = type;
      selected.answer = answer;
      this.setState()
    })
  }

  renderNewQuestion() {
    if (this.state.creatingQuestion) {
      return <NewQuestion
        handleSaveNewQuestionClick={this.handleSaveNewQuestionClick.bind(this)}
        />
    }
  }

  renderLessonDetail() {
    if (this.state.editLesson){
      return <EditLesson handleDeleteLesson={this.handleDeleteLesson.bind(this)} lesson={JSON.parse(JSON.stringify(this.state.editLesson))} editLessonInDB={this.editLessonInDB.bind(this)}/>
    }
  }

  renderNewLesson() {
    if (this.state.creatingLesson){
      return <AddLesson lesson={this.state.AddLesson} addLessonToDB={this.addLessonToDB.bind(this)}/>
    }
  }


  renderQuestionList () {
    if (this.state.selectedLesson) {
      return (
        <QuestionTitleList
          lessonId={this.state.selectedLessonId}
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
          handleSubmit = {this.handleSubmit.bind(this)}
          question={JSON.parse(JSON.stringify(this.state.selectedQuestion))}
          deletedQuestion={this.deletedQuestion.bind(this)}
        />
      )
    }
  }

  render() {
    if (auth.loggedIn()) {
      return (
        <div style={{height: "100%", width: "100%", position: "absolute"}}>
          <div style={{ minWidth: '700px', height: "100%"}}>
            <Navbar />
            <LessonTitleList loadingLessons={this.loadingLessons.bind(this)} selectedLessonId={this.state.selectedLessonId} handleLessonClick={this.handleLessonClick.bind(this)} hideContent={this.deletedLesson.bind(this)} addLesson={this.handleAddLessonClick.bind(this)} editLesson={this.handleEditLessonClick.bind(this)}/>
            {this.renderQuestionList()}
            {this.renderQuestionDetail()}
            {this.renderNewQuestion()}
            {this.renderLessonDetail()}
            {this.renderNewLesson()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default App;
