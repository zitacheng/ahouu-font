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
import avatar from '../../Assets/shib.jpeg';
import cross from '../../Assets/cross.png';

export interface LobbyProps { history: History;}

const Lobby = (props: LobbyProps): React.ReactElement => {
  const [kickShow, setKickShow] = React.useState(false);
  const [players, setPlayers] = React.useState([{ pseudo: 'Zita' }, { pseudo: 'Jean' }, { pseudo: 'Toto' }, { pseudo: 'Titi' }, { pseudo: 'Tata' }, { pseudo: 'Martin' }]);

  return (
    <Container className="containerBg" fluid>
      <Col className="lobbyBg w-75 mx-auto">
        <Row>
          <p className="title mx-auto my-3">{i18n.t('players', { lng: localStorage.getItem('lang') as string })}</p>
        </Row>
        <Row className="px-2" xs={1} sm={2} md={3} lg={3} xl={4}>
          {
          players?.map((player) => (
            <Col>
              <Row>
                <div className="mx-auto avatar-pos">
                  <Image className="mx-auto lobby-circle mb-3 cardShadow" src={avatar} />
                  <Image className="mx-auto lobby-kick mb-3 click" onClick={() => { setKickShow(true); }} src={cross} />
                </div>
              </Row>
              <p className="text-light text-center">{player.pseudo}</p>
            </Col>
          ))
        }
        </Row>
        <Row className="">
          <Button onClick={() => { props.history.push('/game/78'); }} className="mx-auto my-4 btn" variant="outline-success">{i18n.t('play', { lng: localStorage.getItem('lang') as string })}</Button>
        </Row>
      </Col>
      <Modal
        centered
        show={kickShow}
        onHide={() => { setKickShow(false); }}
      >
        <Row className="mx-0 p-2 align-items-center">
          <p className="text-light mx-auto mt-4 font-weight-bold">{i18n.t('kickMsg', { lng: localStorage.getItem('lang') as string })}</p>
        </Row>
        <Button onClick={() => { setPlayers([]); }} className="mx-auto my-4 btn" variant="outline-success">{i18n.t('yes', { lng: localStorage.getItem('lang') as string })}</Button>
      </Modal>
    </Container>
  );
};

export default Lobby;
