import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';

import { StoreProvider, useStore, useStoreRehydrated } from 'easy-peasy';
import * as React from 'react';
import ReactNotification from 'react-notifications-component';
import {
  BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch,
} from 'react-router-dom';

import NotFound from './Component/NotFound';
import Profile from './Container/Account/Profile';
import Register from './Container/Account/Register';
import Game from './Container/Game/Game';
import Lobby from './Container/Game/Lobby';
import PartyList from './Container/Game/PartyList';
import Login from './Container/login';
import Multilang from './Container/Multilang';
import services, { User } from './services';
import store, { useStoreActions } from './Store';

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'fr');

interface Props {
  component: React.FC<RouteComponentProps>
  path: string;
  exact?: boolean;
}

const AuthRoute = ({ component: Component, path, exact = false }: Props): React.ReactElement => {
  const isRehydrated = useStoreRehydrated();
  const cached = useStore().getState() as { user: { item: User | undefined } };
  const { user: { item: user = undefined } = {} } = cached;

  const setUser = useStoreActions((actions) => actions.user.setUser);
  const [loading, setLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    if (!isRehydrated) return;

    if (!user) setLoading(false);
    else {
      services.users
        .verify(user)
        .then((valid) => {
          if (valid) setIsAuthed(true);
          else setUser(undefined);
        })
        .then(() => setLoading(false))
        .catch(() => {
          setUser(undefined);
          setLoading(false);
        });
    }
  }, [isRehydrated, user, setUser]);

  return loading
    ? <div className="containerBg" />
    : (
      <Route
        exact={exact}
        path={path}
        render={(props: RouteComponentProps) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          isAuthed ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
        )}
      />
    );
};

AuthRoute.defaultProps = {
  exact: false,
};

const App: React.FC = () => (
  <StoreProvider store={store}>
    <Multilang />
    <ReactNotification />
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <AuthRoute path="/profile" exact component={Profile} />
        <AuthRoute path="/lobby/:roomId" exact component={Lobby} />
        <AuthRoute path="/game/:roomId" exact component={Game} />
        <AuthRoute path="/list" exact component={PartyList} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </Router>
  </StoreProvider>
);

export default App;
