import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Register from './pages/Register';
import Home from './pages/Home';
import Error from './pages/Error';
import ContestLiveSolo from './pages/contest/admin/ContestLiveSolo';
import UserRegister from './pages/contest/user/UserRegister';
import UserHome from './pages/contest/user/UserHome';

import 'rsuite/dist/styles/rsuite-default.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../public/main.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/"                                 component={Register} />
      <Route path="/accueil"                                component={Home} />
      <Route path="/contest&id=:code"                       component={ContestLiveSolo} />
      <Route path="/contest_:hostName&:code/:id"            component={UserHome} />
      <Route path="/contest_:hostName&:code"                component={UserRegister} />
      <Route exact path="/error"                            component={Error} />
    </Switch>
  </Router>
);

export default App;
