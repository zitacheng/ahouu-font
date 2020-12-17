import * as React from 'react';
import {
  Switch, Route, BrowserRouter as Router, RouteComponentProps, Redirect,
} from 'react-router-dom';
import { StoreProvider, useStore } from 'easy-peasy';
import ReactNotification from 'react-notifications-component';
import Login from './Container/login';
import Multilang from './Container/Multilang';
import NotFound from './Component/NotFound';
import Lobby from './Container/Game/Lobby';
import Game from './Container/Game/Game';
import PartyList from './Container/Game/PartyList';
import Profile from './Container/Account/Profile';
import Register from './Container/Account/Register';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';
import store, { useStoreActions } from './Store';
import services, { User } from './services';

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'fr');

interface Props {
  component: React.FC<RouteComponentProps>
  path: string;
  exact?: boolean;
}

const AuthRoute = ({ component: Component, path, exact = false }: Props): React.ReactElement => {
  const cached = useStore().getState() as { user: { item: User | undefined } };

  const setUser = useStoreActions((actions) => actions.user.setUser);
  const [loading, setLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    const { user } = cached;

    if (!user.item) setLoading(false);
    else {
      services.users
        .verify(user.item)
        .then((valid) => {
          if (valid) setIsAuthed(true);
          else setUser(undefined);
        })
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [cached, setUser]);

  return loading
    ? <div className="containerBg" />
    : (
      <Route
        exact={exact}
        path={path}
        render={(props: RouteComponentProps) => (
          isAuthed
            // eslint-disable-next-line react/jsx-props-no-spreading
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/' }} />
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
        <Route path="/lobby/:roomId" exact component={Lobby} />
        <Route path="/game/:roomId" exact component={Game} />
        <Route path="/list" exact component={PartyList} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </Router>
  </StoreProvider>
);

export default App;
