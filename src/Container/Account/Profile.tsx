import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Form from 'react-bootstrap/Form';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { History } from 'history';
import logo from '../../Assets/logo.png';
import profile from '../../Assets/profile.jpg';
import emailIcon from '../../Assets/email.png';
import userIcon from '../../Assets/user.png';
import edit from '../../Assets/edit.png';
import upload from '../../Assets/upload.png';
import { useStoreState, useStoreActions } from '../../Store';
import services, { UserUpdateInput } from '../../services';

export interface ProfileProps { history: History;}

const Profile = (props: ProfileProps): React.ReactElement => {
  const user = useStoreState((state) => state.user.item);
  const [username, setUsername] = React.useState(user?.username as string);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState(user?.email as string);
  const [picture, setPicture] = React.useState<string>(user?.picture as string);
  const [editInf, setEditInf] = React.useState(false);
  const [createRoom, setCreateRoom] = React.useState(false);
  const [publicMode, setPublicMode] = React.useState(false);
  const inputOpenFileRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const [file, setFile] = React.useState<File | null>(null);
  const setUser = useStoreActions((actions) => actions.user.setUser);

  React.useEffect(() => {
    if (!user) return;

    setUsername(user.username);
    setEmail(user.email);
    setPicture(user.picture || '');
  }, [user]);

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target || !event.target.files || event.target.files.length <= 0) return;
    setFile(event.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      const input: UserUpdateInput = {
        email,
        username,
        password,
      };

      if (file) input.picture = file;
      const updated = await services.users.update(input, user);

      setUser(updated);
      setEditInf(false);
    } catch (e) {
      const error = e as Error;

      // TODO: handle errors
      switch (error.message) {
        case 'auth/invalid-token':
          props.history.push('/login');
          break;
        case 'users/invalid-body':
        case 'users/invalid-email':
        case 'users/invalid-password':
          // Wrong user input
          break;
        case 'users/email-already-in-used':
          // Email already used
          break;
        case 'users/username-already-in-used':
          // Username already used
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container className="containerBg" fluid>
      <Col>
        <Row className="py-2">
          <Image className="loginLogo mx-auto" src={logo} />
        </Row>
        <Card
          bg="dark"
          text="white"
          style={{ width: '18rem' }}
          className="mb-2 mx-auto p-2 cardShadow"
        >
          <Card.Body>
            <Row>
              <OverlayTrigger
                placement="top"
                overlay={(
                  <Tooltip id="1">
                    {i18n.t('edit', { lng: localStorage.getItem('lang') as string })}
                  </Tooltip>
                      )}
              >
                <Image onClick={() => { setEditInf(true); }} className="ml-auto edit-icon" src={edit} />
              </OverlayTrigger>
            </Row>
            <Col>
              <Image className="mx-auto avatar-circle mb-4" src={picture || profile} />
              <Row>
                <Image className="profile-icon mr-3" src={userIcon} />
                <p className="text-center username">{username}</p>
              </Row>
              <Row>
                <Image className="profile-icon mr-3" src={emailIcon} />
                <p>{email}</p>
              </Row>
            </Col>
          </Card.Body>
          <Row>
            <Button onClick={() => { props.history.push('/list'); }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('join game', { lng: localStorage.getItem('lang') as string })}</Button>
            <Button onClick={() => { setCreateRoom(true); }} className="mx-auto mb-2 btn" variant="outline-warning">{i18n.t('create game', { lng: localStorage.getItem('lang') as string })}</Button>
            <Button onClick={() => { props.history.push('/'); }} className="mx-auto mb-2 btn" variant="outline-danger">{i18n.t('deconnection', { lng: localStorage.getItem('lang') as string })}</Button>
          </Row>
        </Card>
      </Col>
      <Modal centered show={createRoom} onHide={() => { setCreateRoom(false); }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {i18n.t('create game', { lng: localStorage.getItem('lang') as string })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Badge pill className="click mr-2 p-2" variant={`${publicMode ? 'info' : 'secondary'}`} onClick={() => { setPublicMode(true); }}>
            {i18n.t('public', { lng: localStorage.getItem('lang') as string })}
          </Badge>
          <Badge pill className="click p-2" variant={`${publicMode ? 'secondary' : 'info'}`} onClick={() => { setPublicMode(false); }}>
            {i18n.t('private', { lng: localStorage.getItem('lang') as string })}
          </Badge>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => { props.history.push('/lobby/8097'); }}>{i18n.t('create', { lng: localStorage.getItem('lang') as string })}</Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={editInf} onHide={() => { setEditInf(false); }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {i18n.t('account inf', { lng: localStorage.getItem('lang') as string })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.File
                ref={inputOpenFileRef}
                className="mt-2"
                style={{ display: 'none' }}
                accept="image/*"
                type="file"
                onChange={handleImgChange}
              />
              {
                    file
                      ? (
                        <div
                          role="button"
                          tabIndex={0}
                          className="mx-auto click chooseImg"
                          onClick={() => {
                            if (inputOpenFileRef && inputOpenFileRef.current) {
                              inputOpenFileRef?.current.click();
                            }
                          }}
                          onKeyDown={() => { }}
                        >
                          <Image
                            className="my-auto mx-auto"
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                            }}
                            src={URL.createObjectURL(file)}
                            roundedCircle
                          />
                        </div>
                      )
                      : (
                        <div
                          role="button"
                          tabIndex={0}
                          className="mx-auto click inputImg"
                          onClick={() => {
                            if (inputOpenFileRef && inputOpenFileRef.current) {
                              inputOpenFileRef?.current.click();
                            }
                          }}
                          onKeyDown={() => { }}
                        >
                          <Image className="my-auto mx-auto" style={{ width: '50px', height: 'auto' }} src={upload} />
                        </div>
                      )
                  }
            </Form.Group>
            <Form.Row>
              <Form.Group controlId="formBasicPseudo" as={Col}>
                <Form.Label>
                  {i18n.t('username', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="text" placeholder="Bob" value={username} onChange={(e) => { setUsername(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicPass" as={Col}>
                <Form.Label>
                  {i18n.t('password', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value); }} />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                {i18n.t('email', { lng: localStorage.getItem('lang') as string })}
                *
              </Form.Label>
              <Form.Control type="text" placeholder="Bob@gmail.com" value={email} onChange={(e) => { setEmail(e.currentTarget.value); }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={onSubmit}
          >
            {i18n.t('save', { lng: localStorage.getItem('lang') as string })}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
