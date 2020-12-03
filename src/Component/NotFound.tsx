import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import i18n from 'i18next';
import { History } from 'history';
import logo from '../Assets/logo.png';
import error from '../Assets/error.png';

export interface NotFoundProps { history?: History;}
export interface NotFoundState { name?: string;}

class NotFound extends React.PureComponent<NotFoundProps, NotFoundState> {
  render(): React.ReactNode {
    const { history } = this.props;

    return (
      <Container className="containerBg" fluid>
        <Row>
          <Image className="loginLogo mx-auto click" src={logo} onClick={() => { history?.push('/'); }} />
        </Row>
        <Row>
          <Image className="loginLogo mx-auto my-2" src={error} />
        </Row>
        <Row className="title justify-content-md-center ">{i18n.t('not found', { lng: localStorage.getItem('lang') as string })}</Row>
      </Container>
    );
  }
}

export default NotFound;
