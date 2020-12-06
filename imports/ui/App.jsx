import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Register from './pages/Register';
import Home from './pages/Home';
import Error from './pages/Error';
import ContestLiveSolo from './pages/contest/admin/ContestLiveSolo';
import User from './pages/contest/user/User';
import UserContest from './pages/contest/user/UserContest';

import 'rsuite/dist/styles/rsuite-default.css';
import '../../public/main.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/"                                 component={Register} />
      <Route path="/accueil"                                component={Home} />
      <Route path="/contest&id=:code"                       component={ContestLiveSolo} />
      <Route path="/contest_:hostName&:code/:id"            component={UserContest} />
      <Route path="/contest_:hostName&:code"                component={User} />
      <Route exact path="/error"                            component={Error} />
    </Switch>
  </Router>
);

export default App;
