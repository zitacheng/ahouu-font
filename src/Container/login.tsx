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
import logo from '../Assets/logo.png';

export interface LoginProps { history: History;}
export interface LoginState { pseudo?: string; password?: string;}

class Login extends React.PureComponent<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      pseudo: '',
      password: '',
    };
  }

  authenticate = (history: History, profile: boolean): void => {
    history.push(profile ? '/Profile' : '/Register');
  };

  render(): React.ReactNode {
    const { history } = this.props;
    const { pseudo, password } = this.state;

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
                  <Form.Label>{i18n.t('pseudo', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Bob" value={pseudo} onChange={(e) => { this.setState({ pseudo: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicPass">
                  <Form.Label>{i18n.t('password', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => { this.setState({ password: e.currentTarget.value }); }} />
                </Form.Group>
              </Form>
            </Card.Body>
            <Row>
              <Button disabled={!pseudo || !password} onClick={() => { this.authenticate(history, true); }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('connect', { lng: localStorage.getItem('lang') as string })}</Button>
              <Button onClick={() => { this.authenticate(history, false); }} className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('register', { lng: localStorage.getItem('lang') as string })}</Button>
            </Row>
          </Card>
        </Col>
      </Container>
    );
  }
}

export default Login;
