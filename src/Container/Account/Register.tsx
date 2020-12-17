import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { History } from 'history';
import logo from '../../Assets/logo.png';
import upload from '../../Assets/upload.png';
import { useStoreActions } from '../../Store';
import services, { UserRegisterInput } from '../../services';

export interface RegisterProps { history: History;}

const Register = (props: RegisterProps): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [imgChanged, setImgChanged] = React.useState(false);
  const inputOpenFileRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const [file, setFile] = React.useState<File | null>(null);
  const setUser = useStoreActions((actions) => actions.user.setUser);

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target || !event.target.files || event.target.files.length <= 0) return;

    setImgChanged(true);
    setFile(event.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      const input: UserRegisterInput = {
        email,
        username,
        password,
      };

      if (file) input.picture = file;
      const user = await services.users.register(input);

      setUser(user);
      props.history.push('/profile');
    } catch (e) {
      const error = e as Error;

      // TODO: handle errors
      switch (error.message) {
        case 'auth/invalid-body':
        case 'auth/invalid-email':
        case 'auth/invalid-password':
          // Wrong user input
          break;
        case 'auth/email-already-in-use':
          // Email already used
          break;
        case 'auth/username-already-in-use':
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
            <Form>
              <Form.Group controlId="formBasicImg">
                <Form.File
                  ref={inputOpenFileRef}
                  className="mt-2"
                  style={{ display: 'none' }}
                  accept="image/*"
                  type="file"
                  onChange={handleImgChange}
                />
                {
                    imgChanged && file
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
              <Form.Group controlId="formBasicPseudo">
                <Form.Label>
                  {i18n.t('username', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="text" placeholder="Bob" value={username} onChange={(e) => { setUsername(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  {i18n.t('email', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="text" placeholder="Bob@gmail.com" value={email} onChange={(e) => { setEmail(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicPass">
                <Form.Label>
                  {i18n.t('password', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value); }} />
              </Form.Group>
            </Form>
          </Card.Body>
          <Row>
            <Button
              disabled={!username || !password || !email}
              onClick={onSubmit}
              className="mx-auto mb-2 btn"
              variant="outline-success"
            >
              {i18n.t('register', { lng: localStorage.getItem('lang') as string })}
            </Button>
          </Row>
        </Card>
      </Col>
    </Container>
  );
};

export default Register;
