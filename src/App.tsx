import * as React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './login';
import Lobby from './Game/Lobby';
import './i18n';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <Route>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/lobby" exact component={Lobby} />
        </Switch>
      </Route>
    </BrowserRouter>
  </div>
);

export default App;
