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

export interface RegisterProps { history: History;}
export interface RegisterState {
  pseudo?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
}

class Register extends React.PureComponent<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      pseudo: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
    };
  }

  authenticate = (history: History): void => {
    // TODO call back api to create account
    history.push('/Profile');
  };

  render(): React.ReactNode {
    const { history } = this.props;
    const {
      pseudo, password, firstname, lastname, email,
    } = this.state;

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
              <Form>
                <Form.Group controlId="formBasicPseudo">
                  <Form.Label>
                    {i18n.t('pseudo', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="text" placeholder="Bob" value={pseudo} onChange={(e) => { this.setState({ pseudo: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicFirstname">
                  <Form.Label>{i18n.t('firstname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Bob" value={firstname} onChange={(e) => { this.setState({ firstname: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicLastname">
                  <Form.Label>{i18n.t('lastname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Durand" value={lastname} onChange={(e) => { this.setState({ lastname: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    {i18n.t('email', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="text" placeholder="Bob@gmail.com" value={email} onChange={(e) => { this.setState({ email: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicPass">
                  <Form.Label>
                    {i18n.t('password', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => { this.setState({ password: e.currentTarget.value }); }} />
                </Form.Group>
              </Form>
            </Card.Body>
            <Row>
              <Button disabled={!pseudo || !password || !email} onClick={() => { this.authenticate(history); }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('register', { lng: localStorage.getItem('lang') as string })}</Button>
            </Row>
          </Card>
        </Col>
      </Container>
    );
  }
}

export default Register;
