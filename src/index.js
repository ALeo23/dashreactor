import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, DefaultRoute } from 'react-router';
import DashboardLessons from './components/dashboards/DashboardLessons.js';
// import './index.css';
import AuthService from './components/utils/AuthService.js';


const auth = new AuthService('4ZP5XvMbVnvvU6hSpNT3togDmRzI7pHH', 'scripty-luke.auth0.com');

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={DashboardLessons} onEnter={auth.login.bind(this)}>
    </Route>
  </Router>
), document.getElementById('app'))