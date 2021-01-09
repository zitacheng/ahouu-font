import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './game.css';
import { History } from 'history';
import { match as Match } from 'react-router-dom';
import avatar from '../../Assets/shib.jpeg';
import cross from '../../Assets/cross.png';
import services, {
  GameEvents, Player, Room, RoomState,
} from '../../services';
import { useStoreState, useStoreActions } from '../../Store';
import Game from '../../services/game';

export interface LobbyProps {
  history: History
  match: Match<Record<string, string> | { roomId: string }>
}

const Lobby = ({ history, match }: LobbyProps): React.ReactElement => {
  const user = useStoreState((state) => state.user.item);
  const setUser = useStoreActions((actions) => actions.user.setUser);

  const [game, setGame] = React.useState<Game | null>(null);
  const [room, setRoom] = React.useState<Room | null>(null);
  const [admin, setAdmin] = React.useState<string | undefined>(undefined);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [kick, setKick] = React.useState<Player | undefined>(undefined);

  const isValidLobby = !!user && !!admin && user.username === admin && players.length >= 4;

  const createGame = () => {
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

        const onConnect = () => {
          if (room && room.state === RoomState.STARTED) history.push(`/game/${room.id}`);
        };

        const onUpdateAdmin = (payload: string) => setAdmin(payload);
        const onUpdatePlayers = (payload: Player[]) => setPlayers(payload);
        const onUserKicked = (payload: Player[]) => {
          if (!payload.find((p) => p.username === user.username)) history.push('/profile');
          else setPlayers(payload);
        };

        const onGameStarted = () => room && history.push(`/game/${room.id}`);

        const events: GameEvents = {
          connect: onConnect,
          'user-kicked': onUserKicked,
          'admin-change': onUpdateAdmin,
          'user-joined': onUpdatePlayers,
          'user-leaved': onUpdatePlayers,
          'game-started': onGameStarted,
          connect_error: () => history.push('/profile'),
        };

        setGame(new Game(res, user.token, events));
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
  };

  const onKick = () => {
    if (!game || !kick) return;

    game.kickUser(kick);
    setKick(undefined);
  };

  const onStartGame = () => {
    if (!game) return;

    game.startGame();
  };

  React.useEffect(createGame, [user, room, game, history, match, setAdmin, setPlayers, setUser]);

  React.useEffect(() => () => {
    if (game && history.action === 'POP') game.disconnect();
  }, [history, game]);

  return (
    <Container className="containerBg" fluid>
      <p className="room w-25 mx-auto my-3">{`${room ? room.name : ''}`}</p>
      <Col className="lobbyBg w-75 mx-auto">
        <Row>
          <p className="title mx-auto my-3">{`${i18n.t('players', { lng: localStorage.getItem('lang') as string })}: ${players.length}/${room ? room.max : 0}`}</p>
        </Row>
        <Row className="px-2" xs={1} sm={2} md={3} lg={3} xl={4}>
          {
            players
              ? players.map((player) => (
                <Col key={player.username}>
                  <Row>
                    <div className="mx-auto avatar-pos">
                      <Image className="mx-auto lobby-circle mb-3 cardShadow" src={player.picture || avatar} />
                      {
                        user && admin === user.username && player.username !== user.username
                          ? (
                            <Image
                              className="mx-auto lobby-kick mb-3 click"
                              onClick={() => { setKick(player); }}
                              src={cross}
                            />
                          )
                          : <></>
                      }
                    </div>
                  </Row>
                  <p className="text-light text-center">{player.username}</p>
                </Col>
              ))
              : undefined
        }
        </Row>
        <Row className="">
          <Button onClick={onStartGame} disabled={!isValidLobby} active={isValidLobby} className="mx-auto my-4 btn" variant="outline-success">{i18n.t('play', { lng: localStorage.getItem('lang') as string })}</Button>
        </Row>
      </Col>
      <Modal
        centered
        show={!!kick}
      >
        <Row className="mx-0 p-2 align-items-center">
          <p className="text-light mx-auto mt-4 font-weight-bold">{i18n.t('kickMsg', { lng: localStorage.getItem('lang') as string })}</p>
        </Row>
        <Button onClick={onKick} className="mx-auto my-4 btn" variant="outline-success">{i18n.t('yes', { lng: localStorage.getItem('lang') as string })}</Button>
      </Modal>
    </Container>
  );
};

export default Lobby;
