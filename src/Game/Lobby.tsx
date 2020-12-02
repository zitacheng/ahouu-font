import * as React from 'react';
import i18n from 'i18next';

export interface LoginProps { name?: string;}
export interface LoginState { name?: string;}

class Lobby extends React.PureComponent<LoginProps, LoginState> {
  render(): React.ReactNode {
    const { name } = this.props;

    return (
      <h1>
        Ahouu Lobby page
        {i18n.t('Welcome to React')}
        {name}
        oui
      </h1>
    );
  }
}

export default Lobby;