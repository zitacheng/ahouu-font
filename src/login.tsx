import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from './Assets/logo.png';

export interface LoginProps { name?: string;}
export interface LoginState { name?: string;}

class Login extends React.PureComponent<LoginProps, LoginState> {
  render(): React.ReactNode {
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
            className="mb-2 mx-auto"
          >
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{i18n.t('pseudo', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Bob" />
                </Form.Group>
              </Form>

            </Card.Body>
            <Button className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('join game', { lng: localStorage.getItem('lang') as string })}</Button>
            <Button className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('create game', { lng: localStorage.getItem('lang') as string })}</Button>
          </Card>
        </Col>
      </Container>
    );
  }
}

export default Login;
