import * as React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login';
import Multilang from './Multilang';
import Lobby from './Game/Lobby';
import PartyList from './Game/PartyList';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'fr');

const App: React.FC = () => (
  <div>
    <Multilang />
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/lobby" exact component={Lobby} />
        <Route path="/list" exact component={PartyList} />
      </Switch>
    </Router>
  </div>
);

export default App;
