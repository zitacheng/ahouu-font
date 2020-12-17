import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import avatar from '../../Assets/shib.jpeg';
import werewolf from '../../Assets/loupgarou.jpeg';
import send from '../../Assets/send.png';
import './game.css';

const card = ['villager', 'werewolf', 'witch', 'seer'];

export interface Chat {
  msg?: string;
  sender?: string;
  wolfChat?: boolean;
  senderId?: number;
  system?: boolean;
  id?: number;
}
export interface UserInf {
  pseudo?: string;
  card?: number;
  isWolf?: boolean;
  id: number;
  dead?: boolean;
}
export interface GameProps { name?: string;}
export interface GameState {
  msg?: string;
  chats?: Array<Chat>;
  user?: UserInf;
  players?: Array<UserInf>;
  displayCard?: boolean;
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
        card: 1,
        isWolf: false,
      },
      chats: [
        {
          msg: 'Lets  kill him', sender: 'Tata', wolfChat: true, senderId: 3, id: 0,
        },
        {
          msg: 'Helloo', sender: 'Baoz', wolfChat: false, senderId: 1, id: 1,
        },
        {
          msg: 'Whats up', sender: 'Toto', wolfChat: false, senderId: 2, id: 2,
        },
        {
          msg: 'Whats up yoou', sender: 'Tata', wolfChat: false, senderId: 3, id: 3,
        },
        {
          msg: 'Toto and Tata voted for Baoz', sender: 'System', wolfChat: false, senderId: -1, system: true, id: 4,
        },
        {
          msg: 'Lets  kill him', sender: 'Tata', wolfChat: true, senderId: 3, id: 5,
        },
        {
          msg: 'im villager', sender: 'Baoz', wolfChat: false, senderId: 1, id: 6,
        },
        {
          msg: 'Baoz has been eliminated', sender: 'system', wolfChat: false, senderId: -1, system: true, id: 7,
        },
      ],
      displayCard: false,
    };
  }

  render(): React.ReactNode {
    const {
      msg, chats, user, players, displayCard,
    } = this.state;

    return (
      <Container className="containerBg" fluid>
        <Col className="lobbyBg w-75 mx-auto">
          <p className="title my-3 text-center">{i18n.t('playing', { lng: localStorage.getItem('lang') as string })}</p>
          <div
            className="click"
            onClick={() => { this.setState({ displayCard: true }); }}
            role="button"
            tabIndex={0}
            style={{ outlineStyle: 'none' }}
            onKeyDown={() => {}}
          >
            <p className="text-light">
              {i18n.t('you are', { lng: localStorage.getItem('lang') as string })}
              {' '}
              {user && user.card && i18n.t(card[user.card], { lng: localStorage.getItem('lang') as string })}
            </p>
          </div>
          <Row xs={1} sm={2} md={2} lg={2} xl={3}>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              {
                players?.map((player) => (
                  <div key={player.id}>
                    <Row><Image className="mx-auto game-circle mb-2 cardShadow" src={avatar} style={{ opacity: player.dead ? 0.2 : 1 }} /></Row>
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
                    <div key={chat.id}>
                      {user?.isWolf && chat.wolfChat && !chat.system
                      && (
                      <div>
                        <p className={`${chat.senderId === user?.id ? 'text-right text-light mb-0' : 'text-light mb-0'}`}>{chat.sender}</p>
                        <p className={`${chat.senderId === user?.id ? 'bubbleMe mb-3 ml-auto text-light' : 'bubble mb-3 text-light'}`}>{chat.msg}</p>
                      </div>
                      )}
                      {!chat.wolfChat && !chat.system
                      && (
                      <div>
                        <p className={`${chat.senderId === user?.id ? 'text-right text-light mb-0' : 'text-light mb-0'}`}>{chat.sender}</p>
                        <p className={`${chat.senderId === user?.id ? 'bubbleMe mb-3 ml-auto text-light' : 'bubble mb-3 text-light'}`}>{chat.msg}</p>
                      </div>
                      )}
                      {chat.system
                      && (
                      <div>
                        <p className="text-center text-light mb-0">System</p>
                        <p className="text-center text-warning">{chat.msg}</p>
                      </div>
                      )}
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
                    <Row><Image className="mx-auto game-circle mb-2 cardShadow" src={avatar} style={{ opacity: player.dead ? 0.2 : 1 }} /></Row>
                    <p className={`${player.dead ? 'text-center text-danger' : 'text-center text-light'}`}>{player.pseudo}</p>
                  </div>
                ))
            }
            </Col>
          </Row>
        </Col>
        <Modal
          centered
          show={displayCard}
          onHide={() => { this.setState({ displayCard: false }); }}
        >
          <Modal.Body>
            <Image className="mx-auto mb-2 identity" src={werewolf} />
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

export default Game;
