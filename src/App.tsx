import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TeamsList from './components/team/TeamsList'
import Home from './components/home/Home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={(props: any) => <Home {...props} />} />
          <Route exact path="/teams" component={(props: any) => <TeamsList {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
