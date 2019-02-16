import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components'

import TeamsList from './components/team/TeamsList'
import Home from './components/home/Home'
import PlayersList from './components/player/PlayersList';
import Navbar from './components/common/Navbar';
import PlayerDetails from './components/player/PlayerDetails';

const Body = styled.div`
  background-color: #efefef;
  min-height: 100vh;
`

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Body>
          <Navbar />

          <Switch>
            <Route exact path="/" component={(props: any) => <Home {...props} />} />
            <Route exact path="/teams" component={(props: any) => <TeamsList {...props} />} />
            <Route exact path="/players" component={(props: any) => <PlayersList {...props} />} />
            <Route exact path="/player/:id" component={(props: any) => <PlayerDetails {...props} />} />
          </Switch>
        </Body>
      </BrowserRouter>
    );
  }
}

export default App;
