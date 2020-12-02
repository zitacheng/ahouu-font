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
import logo from './Assets/logo.png';
import profile from './Assets/profile.jpg';
import email from './Assets/email.png';
import user from './Assets/user.png';

export interface LoginProps { history: History;}
export interface LoginState { pseudo?: string; password?: string; connected?: boolean}

// TODO generer un nom random lorsque le pseudo ne respect les les caractere autorisé

class Login extends React.PureComponent<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      pseudo: '',
      password: '',
      connected: true,
    };
  }

  render(): React.ReactNode {
    const { history } = this.props;
    const { pseudo, password, connected } = this.state;

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
            className="mb-2 mx-auto p-2"
          >
            <Card.Body>
              {
                connected
                  ? (
                    <Col>
                      <Image className="mx-auto avatar-circle mb-4" src={profile} />
                      <p className="text-center pseudo">Baoz</p>
                      <Row>
                        <Image className="profile-icon mr-3" src={user} />
                        <p>Zita Cheng</p>
                      </Row>
                      <Row>
                        <Image className="profile-icon mr-3" src={email} />
                        <p>zita.cheng@epitech.eu</p>
                      </Row>
                    </Col>
                  )
                  : (
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
                  )
              }

            </Card.Body>
            {
              connected
                ? (
                  <Row>
                    <Button onClick={() => { history.push('/list'); }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('join game', { lng: localStorage.getItem('lang') as string })}</Button>
                    <Button onClick={() => { }} className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('create game', { lng: localStorage.getItem('lang') as string })}</Button>
                  </Row>
                )
                : (
                  <Row>
                    <Button disabled={!pseudo || !password} onClick={() => { }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('connect', { lng: localStorage.getItem('lang') as string })}</Button>
                    <Button onClick={() => { }} className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('register', { lng: localStorage.getItem('lang') as string })}</Button>
                  </Row>
                )
            }
          </Card>
        </Col>
      </Container>
    );
  }
}

export default Login;
