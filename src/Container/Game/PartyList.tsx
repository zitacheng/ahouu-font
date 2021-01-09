import * as React from 'react';
import i18n from 'i18next';
import { History } from 'history';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import './game.css';
import { useStoreState } from '../../Store';
import services, { Room } from '../../services';

export interface PartyListProps { history: History }

const PartyList = (props: PartyListProps): React.ReactElement => {
  const user = useStoreState((state) => state.user.item);
  const [rooms, setRooms] = React.useState<Room[]>([]);

  React.useEffect(() => {
    if (!user) return;

    // TODO: handle pagination
    services.rooms
      .getMany(user, { limit: 20, page: 1 })
      .then((res) => setRooms(res))
      .catch(() => undefined);
  }, [user]);

  return (
    <Container className="containerBg" fluid>
      <Col className="mx-auto">
        <Row className="justify-content-md-center px-auto">
          <p className="title">{i18n.t('list game', { lng: localStorage.getItem('lang') as string })}</p>
        </Row>
        <Table responsive className="table-dark table-hover">
          <thead>
            <tr>
              <th>{i18n.t('id', { lng: localStorage.getItem('lang') as string })}</th>
              <th>{i18n.t('name', { lng: localStorage.getItem('lang') as string })}</th>
              <th>{i18n.t('players', { lng: localStorage.getItem('lang') as string })}</th>
              <th>{i18n.t('status', { lng: localStorage.getItem('lang') as string })}</th>
              <th>{i18n.t('type', { lng: localStorage.getItem('lang') as string })}</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} style={{ cursor: 'pointer' }} onClick={() => { props.history?.push(`/lobby/${room.id}`); }}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{`${room.players.length}/${room.max}`}</td>
                <td>{i18n.t(room.state, { lng: localStorage.getItem('lang') as string })}</td>
                <td>{i18n.t(room.private ? 'private' : 'public', { lng: localStorage.getItem('lang') as string })}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Container>
  );
};

export default PartyList;
