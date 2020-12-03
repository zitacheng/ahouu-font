import * as React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Container/login';
import Multilang from './Container/Multilang';
import NotFound from './Component/NotFound';
import Lobby from './Container/Game/Lobby';
import PartyList from './Container/Game/PartyList';
import Profile from './Container/Account/Profile';
import Register from './Container/Account/Register';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'fr');

const App: React.FC = () => (
  <div>
    <Multilang />
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/register" exact component={Register} />
        <Route path="/lobby/:roomId" exact component={Lobby} />
        <Route path="/list" exact component={PartyList} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </Router>
  </div>
);

export default App;
