import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import avatar from '../../Assets/shib.jpeg';
import dead from '../../Assets/dead.png';
import send from '../../Assets/send.png';
import './game.css';

export interface Chat { msg?: string; sender?: string; wolfChat?: boolean; senderId?: number}
export interface UserInf {
  pseudo?: string;
  card?: number;
  isWolf?: boolean;
  id: number;
  dead?: boolean
}
export interface GameProps { name?: string;}
export interface GameState {
  msg?: string;
  chats?: Array<Chat>;
  user?: UserInf;
  players?: Array<UserInf>;
}

// TODO dead people cannot send message

class Game extends React.PureComponent<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      msg: '',
      players: [
        {
          pseudo: 'Zita', id: 1, isWolf: false, card: 1, dead: false,
        },
        {
          pseudo: 'Titi', id: 2, isWolf: false, card: 1, dead: true,
        },
        {
          pseudo: 'Toto', id: 3, isWolf: false, card: 2, dead: false,
        },
        {
          pseudo: 'Tata', id: 4, isWolf: false, card: 3, dead: false,
        },
        {
          pseudo: 'Jean', id: 5, isWolf: false, card: 2, dead: false,
        },
        {
          pseudo: 'Martin', id: 6, isWolf: false, card: 1, dead: true,
        },
      ],
      user: {
        pseudo: 'Baoz',
        id: 1,
        card: 2,
        isWolf: false,
      },
      chats: [
        {
          msg: 'Lets  kill him', sender: 'Tata', wolfChat: true, senderId: 3,
        },
        {
          msg: 'Helloo', sender: 'Baoz', wolfChat: false, senderId: 1,
        },
        {
          msg: 'Whats up', sender: 'Toto', wolfChat: false, senderId: 2,
        },
        {
          msg: 'Whats up yoou', sender: 'Tata', wolfChat: false, senderId: 3,
        },
        {
          msg: 'Toto and Zita voted for Tata', sender: 'System', wolfChat: false, senderId: -1,
        },
        {
          msg: 'Lets  kill him', sender: 'Tata', wolfChat: true, senderId: 3,
        },
        {
          msg: 'im villager', sender: 'Baoz', wolfChat: false, senderId: 1,
        },
      ],
    };
  }

  render(): React.ReactNode {
    const {
      msg, chats, user, players,
    } = this.state;

    return (
      <Container className="containerBg" fluid>
        <Col className="lobbyBg w-75 mx-auto">
          <p className="title my-3 text-center">{i18n.t('playing', { lng: localStorage.getItem('lang') as string })}</p>
          <Row xs={1} sm={2} md={2} lg={2} xl={3}>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              {
                players?.map((player) => (
                  <div>
                    <Row><Image className="mx-auto game-circle mb-2 cardShadow" src={player.dead ? dead : avatar} /></Row>
                    <p className={`${player.dead ? 'text-center text-danger' : 'text-center text-light'}`}>{player.pseudo}</p>
                  </div>
                ))
            }
            </Col>
            <Col className="chatBg" xs={12} sm={6} md={6} lg={6} xl={6}>
              <p className="text-light  text-center">{i18n.t('chat', { lng: localStorage.getItem('lang') as string })}</p>
              <Col className="chatContent">
                {
                  chats?.map((chat) => (
                    <div>
                      {user?.isWolf && chat.wolfChat && <p className={`${chat.senderId === user?.id ? 'bubbleMe mb-3 ml-auto text-light' : 'bubble mb-3 text-light'}`}>{chat.msg}</p>}
                      {!chat.wolfChat && <p className={`${chat.senderId === user?.id ? 'bubbleMe mb-3 ml-auto text-light' : 'bubble mb-3 text-light'}`}>{chat.msg}</p>}
                    </div>
                  ))
                }
              </Col>
              <Form.Control className="chatInput" onChange={(e) => { this.setState({ msg: e.target.value }); }} value={msg} type="text" />
              <Image className="mx-auto send-icon click" src={send} />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              {
                players?.map((player) => (
                  <div>
                    <Row><Image className="mx-auto game-circle mb-2 cardShadow" src={player.dead ? dead : avatar} /></Row>
                    <p className={`${player.dead ? 'text-center text-danger' : 'text-center text-light'}`}>{player.pseudo}</p>
                  </div>
                ))
            }
            </Col>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default Game;
