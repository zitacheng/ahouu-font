import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';
import { History } from 'history';
import { match as Match } from 'react-router-dom';
import avatar from '../../Assets/shib.jpeg';
import disconnected from '../../Assets/disconnected.png';
import wolfMode from '../../Assets/wolf-mode.png';
import villagerCard from '../../Assets/villager.jpg';
import wolfCard from '../../Assets/wolf.jpeg';
import seerCard from '../../Assets/seer.jpg';
import witchCard from '../../Assets/witch.jpg';
import send from '../../Assets/send.png';
import './game.css';
import { useStoreActions, useStoreState } from '../../Store';
import GameInstance from '../../services/game';
import services, {
  GameEvents,
  Message, MessageType, Player, PlayerRole, PlayerState, Room, MessageEvents, RoomTurn, RoomState,
} from '../../services';

export interface GameProps {
  history: History
  match: Match<Record<string, string> | { roomId: string }>
}

type ChatMode = 'general' | 'wolf';

const Game = ({ history, match }: GameProps): React.ReactElement => {
  const user = useStoreState((s) => s.user.item);
  const setUser = useStoreActions((actions) => actions.user.setUser);

  const chatRef = React.useRef<HTMLDivElement>(null);
  const [mode, setMode] = React.useState<ChatMode>('general');
  const [game, setGame] = React.useState<GameInstance | null>(null);
  const [room, setRoom] = React.useState<Room | null>(null);
  const [self, setSelf] = React.useState<Player>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [admin, setAdmin] = React.useState<string | undefined>(undefined);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [turn, setTurn] = React.useState<RoomTurn | null>(null);
  const [displayCard, setDisplayCard] = React.useState(false);
  const [displaySeerChoices, setDisplaySeerChoices] = React.useState(false);
  const [displayWolfChoices, setDisplayWolfChoices] = React.useState(false);
  const [displayWitchChoices, setDisplayWitchChoices] = React.useState(false);
  const [displayUserChoices, setDisplayUserChoices] = React.useState(false);
  const [vote, setVote] = React.useState('');
  const [buttonOptions, setButtonOptions] = React.useState<{
    name: string,
    onClick:(() => void) | undefined
  }>({ name: '', onClick: undefined });

  const cards: Partial<Record<PlayerRole, string>> = {
    villager: villagerCard,
    wolf: wolfCard,
    seer: seerCard,
    witch: witchCard,
  };

  const roles: Partial<Record<PlayerRole, string>> = {
    villager: i18n.t('villager', { lng: localStorage.getItem('lang') as string }),
    wolf: i18n.t('werewolf', { lng: localStorage.getItem('lang') as string }),
    seer: i18n.t('seer', { lng: localStorage.getItem('lang') as string }),
    witch: i18n.t('witch', { lng: localStorage.getItem('lang') as string }),
  };

  const rules: Partial<Record<PlayerRole, string>> = {
    villager: i18n.t('villager-rule', { lng: localStorage.getItem('lang') as string }),
    wolf: i18n.t('wolf-rule', { lng: localStorage.getItem('lang') as string }),
    seer: i18n.t('seer-rule', { lng: localStorage.getItem('lang') as string }),
    witch: i18n.t('witch-rule', { lng: localStorage.getItem('lang') as string }),
  };

  const infos: Partial<Record<MessageEvents, (payload?: Record<string, string>) => string>> = {
    'initial-admin': (payload) => {
      const info = i18n.t('initial-admin', { lng: localStorage.getItem('lang') as string });
      return payload ? info.replace('{admin}', payload.admin) : info;
    },
    'number-of-wolfs': (payload) => {
      const info = i18n.t('number-of-wolfs', { lng: localStorage.getItem('lang') as string });
      return payload ? info.replace('{wolfs}', payload.wolfs) : info;
    },
    'waiting-for-initial-action': () => i18n.t('waiting-for-initial-action', { lng: localStorage.getItem('lang') as string }),
    'admin-start-game': () => i18n.t('admin-start-game', { lng: localStorage.getItem('lang') as string }),
    'new-admin': (payload) => {
      const info = i18n.t('new-admin', { lng: localStorage.getItem('lang') as string });
      return payload ? info.replace('{admin}', payload.admin) : info;
    },
    'village-sleeping': () => i18n.t('village-sleeping', { lng: localStorage.getItem('lang') as string }),
    'seer-wakes-up': () => i18n.t('seer-wakes-up', { lng: localStorage.getItem('lang') as string }),
    'seer-select-choice': () => i18n.t('seer-select-choice', { lng: localStorage.getItem('lang') as string }),
    'seer-result': (payload) => {
      const info = i18n.t('seer-result', { lng: localStorage.getItem('lang') as string });
      return payload ? info.replace('{username}', payload.username).replace('{role}', roles[payload.role as PlayerRole] as string) : info;
    },
    'seer-sleeps': () => i18n.t('seer-sleeps', { lng: localStorage.getItem('lang') as string }),
    'wolfs-wakes-up': () => i18n.t('wolfs-wakes-up', { lng: localStorage.getItem('lang') as string }),
    'wolfs-select-choice': () => i18n.t('wolfs-select-choice', { lng: localStorage.getItem('lang') as string }),
    'wolf-sleeps': () => i18n.t('wolfs-sleeps', { lng: localStorage.getItem('lang') as string }),
    'witch-wakes-up': () => i18n.t('witch-wakes-up', { lng: localStorage.getItem('lang') as string }),
    'witch-select-choice': () => i18n.t('witch-select-choice', { lng: localStorage.getItem('lang') as string }),
    'witch-sleeps': () => i18n.t('witch-sleeps', { lng: localStorage.getItem('lang') as string }),
    'village-wakes-up': (payload) => {
      const info = i18n.t('village-wakes-up', { lng: localStorage.getItem('lang') as string });
      return payload ? info.replace('{nb}', payload.killed) : info;
    },
    'player-died': (payload) => {
      const info = i18n.t('wolf-win', { lng: localStorage.getItem('lang') as string });
      return payload ? info.replace('{username}', payload.player) : info;
    },
    'wolf-win': () => i18n.t('wolf-win', { lng: localStorage.getItem('lang') as string }),
    'village-win': () => i18n.t('wolf-win', { lng: localStorage.getItem('lang') as string }),

  };

  React.useEffect(() => {
    if (user && room) {
      if (room.adminTurn === 'init'
      && user.username === room.admin
      && room.state === RoomState.STARTED) setTurn('put-to-sleep');
      if (room.adminTurn === 'vote') setTurn('launch-vote');
    }
  }, [turn, room, user]);

  React.useEffect(() => {
    if (!user || game) return;

    const { roomId: id } = match.params;

    const signOut = () => {
      setUser(undefined);
      history.push('/');
    };

    services.rooms
      .getOne(user, { id })
      .then((res) => {
        setRoom(res);
        setAdmin(res.admin);
        setPlayers(res.players);

        const me = res.players.find((p) => p.username === user.username) as Player;
        setSelf(me);
        setMessages(me.messages);

        const onUpdateAdmin = (payload: string) => setAdmin(payload);
        const onUpdatePlayers = (payload: Player[]) => setPlayers(payload);
        const onNewMessages = (payload: Message[]) => setMessages(payload);
        const onNewTurn = (payload: RoomTurn) => setTurn(payload);
        const onVillageSleeps = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setTurn(null);
          setMessages(ref.messages);
        };
        const onSeerWakesUp = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setMessages(ref.messages);
        };
        const onSeerSleeps = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setMessages(ref.messages);
        };
        const onWolfsWakesUp = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setMessages(ref.messages);
        };
        const onWolfsSleeps = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setMessages(ref.messages);
        };

        const onWitchWakesUp = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setMessages(ref.messages);
        };
        const onWitchSleeps = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setMessages(ref.messages);
        };
        const onVillageAwaken = (payload: Room) => {
          const ref = payload.players.find((p) => p.username === user.username) as Player;

          setSelf(ref);
          setTurn('launch-vote');
          setMessages(ref.messages);
        };

        const events: GameEvents = {
          'village-awakes': onVillageAwaken,
          'witch-sleeps': onWitchSleeps,
          'witch-wakes-up': onWitchWakesUp,
          'wolfs-sleeps': onWolfsSleeps,
          'wolfs-wakes-up': onWolfsWakesUp,
          'seer-sleeps': onSeerSleeps,
          'seer-wakes-up': onSeerWakesUp,
          'village-sleeps': onVillageSleeps,
          'your-turn': onNewTurn,
          'admin-change': onUpdateAdmin,
          'user-joined': onUpdatePlayers,
          'user-leaved': onUpdatePlayers,
          'new-message': onNewMessages,
          connect_error: () => history.push('/profionWolfsle'),
        };

        setGame(new GameInstance(res, user.token, events));
      })
      .catch((e) => {
        const error: Error = e as Error;

        switch (error.message) {
          case 'auth/invalid-token':
            signOut();
            break;
          case 'rooms/invalid-body':
          case 'rooms/room-not-found':
            history.push('/profile');
            break;
          default:
            break;
        }
      });
  }, [user, game, history, match, setUser, setGame]);

  const sendMessage = () => {
    if (!game || !message) return;

    game.sendMessage({
      type: mode === 'general' ? MessageType.GENERAL : MessageType.WOLF,
      content: message,
    });

    setMessage('');
  };

  const onChatKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const changeChatMode = () => {
    setMode(mode === 'general' ? 'wolf' : 'general');
  };

  React.useEffect(() => {
    if (!game || !self) return;

    const seerSelectPlayer = () => {
      setDisplaySeerChoices(true);
    };

    const wolfSelectPlayer = () => {
      setDisplayWolfChoices(true);
    };

    const witchSelectPotion = () => {
      setDisplayWitchChoices(true);
    };

    const userSelectPlayer = () => {
      setDisplayUserChoices(true);
    };

    if (self.state === PlayerState.ROLE_BASED_ACTION) {
      switch (self.role) {
        case PlayerRole.SEER:
          setButtonOptions({
            name: i18n.t('seer-select-player', { lng: localStorage.getItem('lang') as string }),
            onClick: seerSelectPlayer,
          });
          break;
        case PlayerRole.WOLF:
          setButtonOptions({
            name: i18n.t('wolf-select-player', { lng: localStorage.getItem('lang') as string }),
            onClick: wolfSelectPlayer,
          });
          break;
        case PlayerRole.WITCH:
          setButtonOptions({
            name: i18n.t('witch-select-potion', { lng: localStorage.getItem('lang') as string }),
            onClick: witchSelectPotion,
          });
          break;
        default:
          setButtonOptions({
            name: i18n.t('not-your-turn', { lng: localStorage.getItem('lang') as string }),
            onClick: undefined,
          });
          break;
      }
    } else {
      switch (turn) {
        case 'put-to-sleep':
          setButtonOptions({
            name: i18n.t('put-to-sleep', { lng: localStorage.getItem('lang') as string }),
            onClick: game.putVillageToSleep,
          });
          break;
        case 'launch-vote':
          setButtonOptions({
            name: i18n.t('user-vote', { lng: localStorage.getItem('lang') as string }),
            onClick: userSelectPlayer,
          });
          break;
        default:
          setButtonOptions({
            name: i18n.t('not-your-turn', { lng: localStorage.getItem('lang') as string }),
            onClick: undefined,
          });
          break;
      }
    }
  }, [turn, self, game]);

  React.useEffect(() => {
    if (chatRef) {
      const ref = chatRef as React.MutableRefObject<HTMLDivElement>;
      const scroll = ref.current.scrollHeight - ref.current.clientHeight;
      ref.current.scrollTo(0, scroll);
    }
  });

  return (
    <Container className="containerBg" fluid>
      <Col className="lobbyBg w-75 mx-auto">
        <p className="title my-3 text-center">{room ? room.name : undefined}</p>
        <div
          className="click"
          onClick={() => { setDisplayCard(true); }}
          role="button"
          tabIndex={0}
          style={{ outlineStyle: 'none' }}
          onKeyDown={() => {}}
        >
          <OverlayTrigger
            placement="top"
            overlay={(
              <Tooltip id="3">
                {i18n.t('check', { lng: localStorage.getItem('lang') as string })}
              </Tooltip>
          )}
          >
            <Image className="miniCard" src={self ? cards[self?.role] : undefined} />
          </OverlayTrigger>
        </div>
        <Row xs={1} sm={2} md={2} lg={2} xl={3}>
          <Col xs={12} sm={6} md={4} lg={3} xl={3}>
            {
              players.map((player, i) => (
                i < Math.floor(players.length / 2)
                  ? (
                    <div key={player.username}>
                      <Row>
                        <div className="mx-auto avatar-pos">
                          <Image className="mx-auto game-circle mb-2 cardShadow" src={avatar} style={{ opacity: player.state === PlayerState.DEAD ? 0.2 : 1 }} />
                          {
                            !player.connected
                              ? <Image className="mx-auto game-disconnected mb-3 click" src={disconnected} />
                              : undefined
                          }
                        </div>
                      </Row>
                      <p className={`${player.state === PlayerState.DEAD ? 'text-center text-danger' : 'text-center text-light'}`}>{player.username}</p>
                    </div>
                  )
                  : <></>
              ))
          }
          </Col>
          <Col className="chatBg" xs={12} sm={6} md={6} lg={6} xl={6}>
            <p className="text-light  text-center">{i18n.t('chat', { lng: localStorage.getItem('lang') as string })}</p>
            <Col ref={chatRef} className="chatContent">
              {
                user && messages?.map((item) => (
                  <div key={item.id}>
                    {item.type === MessageType.GENERAL
                      ? (
                        <div>
                          <p className={`${
                            item.username === user.username
                              ? 'text-right text-light mb-0'
                              : 'text-light mb-0'}`}
                          >
                            {item.username}
                          </p>
                          <p className={`${
                            item.username === user.username
                              ? 'bubbleMe mb-3 ml-auto text-light'
                              : 'bubble mb-3 text-light'}`}
                          >
                            {item.content}
                          </p>
                        </div>
                      ) : <></>}
                    {item.type === MessageType.WOLF
                      ? (
                        <div>
                          <p
                            className={`${
                              item.username === user.username
                                ? 'text-right text-danger mb-0'
                                : 'text-danger mb-0'}`}
                          >
                            {item.username}
                          </p>
                          <p className={`${
                            item.username === user.username
                              ? 'bubbleMe wolf mb-3 ml-auto text-light'
                              : 'bubble wolf mb-3  text-light'}`}
                          >
                            {item.content}
                          </p>
                        </div>
                      ) : <></>}
                    {item.type === MessageType.SYSTEM_GENERAL
                      ? (
                        <div>
                          <p className="text-center text-light mb-0">System</p>
                          <p className="text-center text-warning">
                            {(() => {
                              const event = infos[item.content as MessageEvents];

                              return event ? <>{event(item.payload)}</> : <></>;
                            })()}
                          </p>
                        </div>
                      ) : <></>}
                    {item.type === MessageType.SYSTEM_SELF
                      ? (
                        <div>
                          <p className="text-center text-light mb-0">System</p>
                          <p className="text-center text-info">
                            {(() => {
                              const event = infos[item.content as MessageEvents];

                              return event ? <>{event(item.payload)}</> : <></>;
                            })()}
                          </p>
                        </div>
                      ) : <></>}
                    {item.type === MessageType.SYSTEM_WOLF
                      ? (
                        <div>
                          <p className="text-center text-light mb-0">System</p>
                          <p className="text-center text-danger">
                            {(() => {
                              const event = infos[item.content as MessageEvents];

                              return event ? <>{event(item.payload)}</> : <></>;
                            })()}
                          </p>
                        </div>
                      ) : <></>}
                  </div>
                ))
              }
            </Col>
            <Container>
              <Row>
                <Col className="m-auto">
                  {self?.role === PlayerRole.WOLF
                    ? (
                      <Image
                        className={
                        `${mode === 'wolf'
                          ? 'toggle-wolf wolfChat d-block mx-auto img-fluid click'
                          : 'toggle-wolf d-block mx-auto img-fluid click'}`
                        }
                        src={wolfMode}
                        onClick={changeChatMode}
                      />
                    )
                    : <></>}
                </Col>
                <Col xs={8}>
                  <Form.Control className="chatInput" onChange={(e) => { setMessage(e.target.value); }} onKeyPress={onChatKeyPress} value={message} type="text" />
                </Col>
                <Col className="m-auto">
                  <Image className="send-icon d-block mx-auto img-fluid click" src={send} onClick={sendMessage} />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={3}>
            {
              players.map((player, i) => (
                i >= Math.floor(players.length / 2)
                  ? (
                    <div key={player.username}>
                      <Row><Image className="mx-auto game-circle mb-2 cardShadow" src={avatar} style={{ opacity: player.state === PlayerState.DEAD ? 0.2 : 1 }} /></Row>
                      <p className={`${player.state === PlayerState.DEAD ? 'text-center text-danger' : 'text-center text-light'}`}>{player.username}</p>
                    </div>
                  )
                  : <></>
              ))
          }
          </Col>
        </Row>
        {
          !!self && self.state !== PlayerState.DEAD
            ? (
              <Row className="">
                <Button
                  className="mx-auto my-4 btn"
                  variant="outline-success"
                  disabled={!turn && self?.state !== PlayerState.ROLE_BASED_ACTION}
                  active={!!turn || self?.state === PlayerState.ROLE_BASED_ACTION}
                  onClick={buttonOptions.onClick}
                >
                  {buttonOptions.name}
                </Button>
              </Row>
            )
            : undefined
        }

      </Col>
      <Modal
        centered
        show={displayCard}
        onHide={() => { setDisplayCard(false); }}
      >
        <Row className="mx-0 p-2 align-items-center">
          <Col>
            <Image className="mx-auto mb-2 identity" src={self ? cards[self?.role] : undefined} />
          </Col>
          <Col className="text-center pt-auto">
            <p className="mt-auto rule-text">{self ? rules[self?.role] : undefined}</p>
          </Col>
        </Row>
      </Modal>
      <Modal
        centered
        show={displaySeerChoices}
        onHide={() => { setDisplaySeerChoices(false); }}
      >
        <Form>
          <Form.Group controlId="voteForm">
            <Form.Label>{buttonOptions.name}</Form.Label>
            <Form.Control size="sm" as="select" custom onChange={(e) => (e.target.value === '-' ? setVote('') : setVote(e.target.value))}>
              <option>-</option>
              {players.map((player) => (
                player.role !== PlayerRole.SEER
                  ? <option>{player.username}</option>
                  : <></>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          className="mx-auto my-4 btn"
          disabled={!vote}
          active={!!vote}
          onClick={() => {
            game?.sendSeerVote(vote);
            setVote('');
            setDisplaySeerChoices(false);
          }}
        >
          {buttonOptions.name}
        </Button>
      </Modal>
      <Modal
        centered
        show={displayWolfChoices}
        onHide={() => { setDisplayWolfChoices(false); }}
      >
        <Form>
          <Form.Group controlId="voteForm">
            <Form.Label>{buttonOptions.name}</Form.Label>
            <Form.Control size="sm" as="select" custom onChange={(e) => (e.target.value === '-' ? setVote('') : setVote(e.target.value))}>
              <option>-</option>
              {players.map((player) => (
                player.role !== PlayerRole.WOLF
                  ? <option>{player.username}</option>
                  : <></>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          className="mx-auto my-4 btn"
          disabled={!vote}
          active={!!vote}
          onClick={() => {
            game?.sendWolfVote(vote);
            setVote('');
            setDisplayWolfChoices(false);
          }}
        >
          {buttonOptions.name}
        </Button>
      </Modal>

      <Modal
        centered
        show={displayWitchChoices}
        onHide={() => { setDisplayWitchChoices(false); }}
      >
        <Form>
          <Form.Group controlId="voteForm">
            <Form.Label>{buttonOptions.name}</Form.Label>
            <Form.Control size="sm" as="select" custom onChange={(e) => (e.target.value === '-' ? setVote('') : setVote(e.target.value))}>
              <option>-</option>
              {players.map((player) => <option>{player.username}</option>)}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          className="mx-auto my-4 btn"
          active
          onClick={() => {
            game?.sendWitchVote(vote);
            setVote('');
            setDisplayWitchChoices(false);
          }}
        >
          {buttonOptions.name}
        </Button>
      </Modal>

      <Modal
        centered
        show={displayUserChoices}
        onHide={() => { setDisplayUserChoices(false); }}
      >
        <Form>
          <Form.Group controlId="voteForm">
            <Form.Label>{buttonOptions.name}</Form.Label>
            <Form.Control size="sm" as="select" custom onChange={(e) => (e.target.value === '-' ? setVote('') : setVote(e.target.value))}>
              <option>-</option>
              {players.map((player) => (
                player.username !== user?.username
                  ? <option>{player.username}</option>
                  : <></>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button
          className="mx-auto my-4 btn"
          active
          onClick={() => {
            game?.userVote(vote);
            setVote('');
            setDisplayUserChoices(false);
          }}
        >
          {buttonOptions.name}
        </Button>
      </Modal>
    </Container>
  );
};

export default Game;
