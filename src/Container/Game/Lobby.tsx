import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './game.css';

export interface LobbytProps { name?: string;}
export interface LobbytState { name?: string;}

class Lobby extends React.PureComponent<LobbytProps, LobbytState> {
  render(): React.ReactNode {
    return (
      <Container className="containerBg" fluid>
        <Col>
          <Row>
            Room
            {i18n.t('id', { lng: localStorage.getItem('lang') as string })}
          </Row>
        </Col>
      </Container>
    );
  }
}

export default Lobby;
