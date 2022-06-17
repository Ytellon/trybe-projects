import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import GamePage from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/play" component={ GamePage } />
        <Route path="/setting" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}
