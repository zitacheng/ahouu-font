import * as React from 'react';

type LoginProps = { name?: string};
type LoginState = { name?: string};

class Login extends React.PureComponent<LoginProps, LoginState> {
  render(): React.ReactNode {
    const { name } = this.props;
    return (
      <h1>
        Hello,
        {name}
        oui
      </h1>
    );
  }
}

export default Login;
