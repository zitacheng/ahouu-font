import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { History } from 'history';
import { useStoreActions, useStoreState } from '../Store';
import logo from '../Assets/logo.png';
import services from '../services';

export interface LoginProps { history: History;}

const Login = (props: LoginProps): React.ReactElement => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const setUser = useStoreActions((actions) => actions.setUser);
  const user = useStoreState((state) => state.item);

  React.useEffect(() => {
    if (!user || !user.token) return;

    // TODO: verify stored token and auto-login if valid
    props.history.push('/profile');
  }, [user, props]);

  const onSubmit = async () => {
    try {
      setUser(await services.users.signIn(email, password));
    } catch (e) {
      // TODO: handle errors
      const error = e as Error;

      // TODO: handle errors
      switch (error.message) {
        case 'auth/invalid-body':
        case 'auth/invalid-email':
        case 'auth/invalid-password':
          // Wrong user input
          break;
        case 'auth/user-not-found':
          // Wrong email
          break;
        case 'auth/invalid-credentials':
          // Wrong password
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container className="containerBg" fluid>
      <Col>
        <Row className="py-2">
          <Image className="loginLogo mx-auto" src={logo} />
        </Row>
        <Card
          bg="dark"
          text="white"
          style={{ width: '18rem' }}
          className="mb-2 mx-auto p-2 cardShadow"
        >
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicPseudo">
                <Form.Label>{i18n.t('email', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                <Form.Control type="text" placeholder="name@domain.com" value={email} onChange={(e) => { setEmail(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicPass">
                <Form.Label>{i18n.t('password', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value); }} />
              </Form.Group>
            </Form>
          </Card.Body>
          <Row>
            <Button
              disabled={!email || !password}
              onClick={onSubmit}
              className="mx-auto mb-2 btn"
              variant="outline-success"
            >
              {i18n.t('connect', { lng: localStorage.getItem('lang') as string })}
            </Button>
            <Button onClick={() => { props.history.push('/Register'); }} className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('register', { lng: localStorage.getItem('lang') as string })}</Button>
          </Row>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
