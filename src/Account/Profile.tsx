import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Form from 'react-bootstrap/Form';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { History } from 'history';
import logo from '../Assets/logo.png';
import profile from '../Assets/profile.jpg';
import emailIcon from '../Assets/email.png';
import user from '../Assets/user.png';
import edit from '../Assets/edit.png';

export interface ProfileProps { history: History;}
export interface ProfileState {
  pseudo?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  editInf?: boolean;
  createRoom?: boolean;
  publicMode?: boolean;
}

class Profile extends React.PureComponent<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      editInf: false,
      createRoom: false,
      publicMode: true,
      pseudo: 'Baoz',
      password: '',
      firstname: 'Zita',
      lastname: 'Cheng',
      email: 'zita.cheng@epitech.eu',
    };
  }

  render(): React.ReactNode {
    const { history } = this.props;
    const {
      pseudo, password, editInf, firstname, lastname, email, createRoom, publicMode,
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
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={(
                    <Tooltip id="1">
                      {i18n.t('edit', { lng: localStorage.getItem('lang') as string })}
                    </Tooltip>
                      )}
                >
                  <Image onClick={() => { this.setState({ editInf: true }); }} className="ml-auto edit-icon" src={edit} />
                </OverlayTrigger>
              </Row>
              <Col>
                <Image className="mx-auto avatar-circle mb-4" src={profile} />
                <p className="text-center pseudo">{pseudo}</p>
                <Row>
                  <Image className="profile-icon mr-3" src={user} />
                  <p>{`${firstname as string} ${lastname as string}`}</p>
                </Row>
                <Row>
                  <Image className="profile-icon mr-3" src={emailIcon} />
                  <p>{email}</p>
                </Row>
              </Col>
            </Card.Body>
            <Row>
              <Button onClick={() => { history.push('/list'); }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('join game', { lng: localStorage.getItem('lang') as string })}</Button>
              <Button onClick={() => { this.setState({ createRoom: true }); }} className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('create game', { lng: localStorage.getItem('lang') as string })}</Button>
              <Button onClick={() => { history.push('/'); }} className="mx-auto mb-2 btn" variant="outline-danger">{i18n.t('deconnection', { lng: localStorage.getItem('lang') as string })}</Button>
            </Row>
          </Card>
        </Col>
        <Modal centered show={createRoom} onHide={() => { this.setState({ createRoom: false }); }}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {i18n.t('create game', { lng: localStorage.getItem('lang') as string })}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Badge pill className="click mr-2 p-2" variant={`${publicMode ? 'info' : 'secondary'}`} onClick={() => { this.setState({ publicMode: true }); }}>
              {i18n.t('public', { lng: localStorage.getItem('lang') as string })}
            </Badge>
            <Badge pill className="click p-2" variant={`${publicMode ? 'secondary' : 'info'}`} onClick={() => { this.setState({ publicMode: false }); }}>
              {i18n.t('private', { lng: localStorage.getItem('lang') as string })}
            </Badge>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={() => { history.push('/lobby'); }}>{i18n.t('create', { lng: localStorage.getItem('lang') as string })}</Button>
          </Modal.Footer>
        </Modal>
        <Modal centered show={editInf} onHide={() => { this.setState({ editInf: false }); }}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {i18n.t('account inf', { lng: localStorage.getItem('lang') as string })}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group controlId="formBasicPseudo" as={Col}>
                  <Form.Label>
                    {i18n.t('pseudo', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="text" placeholder="Bob" value={pseudo} onChange={(e) => { this.setState({ pseudo: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicPass" as={Col}>
                  <Form.Label>
                    {i18n.t('password', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => { this.setState({ password: e.currentTarget.value }); }} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group controlId="formBasicFirstname" as={Col}>
                  <Form.Label>{i18n.t('firstname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Bob" value={firstname} onChange={(e) => { this.setState({ firstname: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicLastname" as={Col}>
                  <Form.Label>{i18n.t('lastname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Durand" value={lastname} onChange={(e) => { this.setState({ lastname: e.currentTarget.value }); }} />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  {i18n.t('email', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="text" placeholder="Bob@gmail.com" value={email} onChange={(e) => { this.setState({ email: e.currentTarget.value }); }} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={() => { this.setState({ editInf: false }); }}>{i18n.t('save', { lng: localStorage.getItem('lang') as string })}</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default Profile;
