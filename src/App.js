import React from 'react';
import Navbar from './components/layout/navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UpcomingTournaments from './components/data/homePage/upcomingTournaments/UpcomingTournaments';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Tournament from './components/data/homePage/upcomingTournaments/Tournament';
import About from './components/data/aboutPage/About';
import TournamentHighlights from './components/data/homePage/tournamentHighlights/TournamentHighlights';
import PlayersTab from './components/data/playersPage/playerstab/PlayersTab';
import CreateDraws from './components/utils/draws/CreateDraws';
import Draws from './components/utils/draws/Draws';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route path='/signup' component={SignUp} />

        {/* home page */}
        <Route
          exact
          path='/upcomingtournaments'
          component={UpcomingTournaments}
        />
        <Route exact path='/upcomingtournaments/:id' component={Tournament} />

        <Route
          exact
          path='/tournamenthighlights'
          component={TournamentHighlights}
        />

        {/* about page */}
        <Route exact path='/about' component={About} />

        {/* Players page */}
        <Route exact path='/players' component={PlayersTab} />

        <Route exact path='/createDraws/:tournament' component={Draws} />
        <Route
          exact
          path='/createDraws/:tournament/:event'
          component={CreateDraws}
        />

        {/* create draws */}
        <Route exact path='/createDraws' component={Draws} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
