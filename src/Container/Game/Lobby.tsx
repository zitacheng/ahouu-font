import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './game.css';

export interface UserInfo { pseudo?: string;}
export interface LobbytProps { name?: string;}
export interface LobbytState { players?: Array<UserInfo>;}

class Lobby extends React.PureComponent<LobbytProps, LobbytState> {
  constructor(props: LobbytProps) {
    super(props);
    this.state = {
      players: [{ pseudo: 'Zita' }, { pseudo: 'Jean' }, { pseudo: 'Toto' }, { pseudo: 'Titi' }, { pseudo: 'Tata' }, { pseudo: 'Martin' }],
    };
  }

  render(): React.ReactNode {
    const { players } = this.state;
    return (
      <Container className="containerBg" fluid>
        <Col className="lobbyBg w-75 h-75 mx-auto">
          <Row>
            <p className="title mx-auto my-2">{i18n.t('players', { lng: localStorage.getItem('lang') as string })}</p>
          </Row>
          <Row>
            {
            players?.map((player) => (
              <Col>
                <p>{player.pseudo}</p>
              </Col>
            ))
          }
          </Row>
          <Row className="">
            <Button onClick={() => {}} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('play', { lng: localStorage.getItem('lang') as string })}</Button>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default Lobby;
