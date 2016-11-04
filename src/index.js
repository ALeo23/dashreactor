import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, DefaultRoute } from 'react-router';
import DashboardLessons from './components/dashboards/DashboardLessons.js';
// import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/*" component={DashboardLessons}>
    </Route>
  </Router>
), document.getElementById('app'))