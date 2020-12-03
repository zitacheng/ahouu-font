import * as React from 'react';
import i18n from 'i18next';
import { History } from 'history';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import './game.css';

export interface PartyListProps { history?: History;}
export interface PartyListState { name?: string;}

class PartyList extends React.PureComponent<PartyListProps, PartyListState> {
  constructor(props: PartyListProps) {
    super(props);
    this.state = {

    };
  }

  render(): React.ReactNode {
    const { history } = this.props;

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
              <tr style={{ cursor: 'pointer' }} onClick={() => { history?.push('/lobby'); }}>
                <td>1</td>
                <td>test</td>
                <td>10</td>
                <td>Commencé</td>
                <td>Privée</td>
              </tr>
              <tr style={{ cursor: 'pointer' }}>
                <td>2</td>
                <td>test toot</td>
                <td>6</td>
                <td>En attente</td>
                <td>Public</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Container>
    );
  }
}

export default PartyList;
