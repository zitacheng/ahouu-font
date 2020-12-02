import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { History } from 'history';
import logo from '../Assets/logo.png';
import profile from '../Assets/profile.jpg';
import email from '../Assets/email.png';
import user from '../Assets/user.png';
import edit from '../Assets/edit.png';

export interface ProfileProps { history: History;}
export interface ProfileState { pseudo?: string; password?: string;}

class Profile extends React.PureComponent<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
    //   pseudo: '',
    //   password: '',
    };
  }

  render(): React.ReactNode {
    const { history } = this.props;
    // const { pseudo, password } = this.state;

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
                  <Image className="ml-auto edit-icon" src={edit} />
                </OverlayTrigger>
              </Row>
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
            </Card.Body>
            <Row>
              <Button onClick={() => { history.push('/list'); }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('join game', { lng: localStorage.getItem('lang') as string })}</Button>
              <Button onClick={() => { }} className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('create game', { lng: localStorage.getItem('lang') as string })}</Button>
              <Button onClick={() => { history.push('/'); }} className="mx-auto mb-2 btn" variant="outline-danger">{i18n.t('deconnection', { lng: localStorage.getItem('lang') as string })}</Button>
            </Row>
          </Card>
        </Col>
      </Container>
    );
  }
}

export default Profile;
